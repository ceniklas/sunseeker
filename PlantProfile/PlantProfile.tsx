import * as React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PlantClass from '../Classes/Plant'
import momentTimezone from 'moment-timezone'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const Timeline = require('react-native-timeline-listview').default

const GET_PLANT = gql`
  query getPlant($id: ID!) {
    Plant(id: $id) {
      id
      name
      moments {
        createdAt
        description
        imageUri
        tags
      }
    }
  }
`

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: '#67aa67' }} />;

export default class PlantProfile extends React.Component<any, any> {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'third', title: 'Third' },
    ],
  };

  renderTabHeaderTab = (tabActive:boolean, tabText:string, onPress) => (
    <TouchableOpacity
      key={tabText}
      style={[
      tabActive ?
        { backgroundColor: '#FFF' }
        : { backgroundColor: '#40C29B' },
      {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
      }]}
      onPress={onPress}
    >
      { tabActive ?
        <Text style={{ color: 'green' }}>
          {tabText}
        </Text>
        :
        <Text style={{ color: '#FFF' }}>
          {tabText}
        </Text>
      }
    </TouchableOpacity>
  );

  renderTabHeader = (props:any) => (
    <View style={{ flexDirection: 'row' }}>
      {
        ['Info', 'Family Tree', 'Nice Tab'].map((tab, idx) => (
          this.renderTabHeaderTab(
            props.navigationState.index === idx,
            tab,
            () => this.setState({ index: idx }),
          )
        ))
      }
    </View>
  );

  renderPlantProfileInfo = (plantId:string) => (
    <Query query={GET_PLANT} variables={{id: plantId}}>
      {({data}) => {
        if(!data || !data.Plant) return null
        const plant = new PlantClass(data.Plant)
        const timelineData = plant.moments.map((moment, index) => {
          let timelinePoint: any = {
            time: momentTimezone(moment.createdAt).tz('Europe/Stockholm').format('YYYY-MM-DD HH:mm'),
            title: 'Moment #' + (index+1),
            description: moment.description,
          }
          return timelinePoint
        })
        return (
          <React.Fragment>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{plant.name}</Text>
            </View>
            <View style={styles.coverPhotoContainer}>
              <Image style={styles.coverPhoto} source={{uri: plant.coverPhotoUri}}/>
            </View>
              <Timeline
                circleSize={20}
                circleColor='rgb(45,156,219)'
                lineColor='rgb(45,156,219)'
                timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                descriptionStyle={{color:'gray'}}
                options={{
                  style:{paddingTop:15}
                }}
                data={timelineData}
              />
          </React.Fragment>
        )
      }}
    </Query>
  )
  
  render() {
    const { navigation: { state: { params: {plantId} } } } = this.props

    const renderScene = SceneMap({
      first: () => this.renderPlantProfileInfo(plantId),
      second: SecondRoute,
      third: ThirdRoute,
    });

    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={renderScene}
        renderHeader={props => this.renderTabHeader({ ...props })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ height: 0, width: Dimensions.get('window').width }}
      />
    )
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  name: {
    fontSize: 20
  },
  coverPhoto: {
    width: 200,
    height: 200
  },
  coverPhotoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})