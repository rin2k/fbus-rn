import {Divider, Header, Screen} from '@/components';
import {getCoordinationService} from '@/services';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, Text} from 'react-native';
import ListItem from './component/list-item';
import styles from './styles';

const CoordinationDetailScreen = () => {
  const route = useRoute();
  const [data, setData] = useState([]);

  const id = route.params.id;

  useEffect(() => {
    getCoordinationService(id).then(data => {
      setData(data);
    });
  }, []);

  const driveInfor = [
    {
      label: 'Fullname',
      value: data?.driver?.fullName,
    },
    {
      label: 'Email',
      value: data?.driver?.personalEmail,
    },
    {
      label: 'Phone number',
      value: data?.driver?.phoneNumber,
    },
    {
      label: 'Birthday',
      value: data?.driver?.dateOfBirth
        ? moment(data?.driver?.dateOfBirth).format('DD-MM-YYYY')
        : null,
    },
    {
      label: 'Gender',
      value: data?.driver?.gender.trim(),
    },
    {
      label: 'Address',
      value: data?.driver?.address,
    },
  ];

  const busInfor = [
    {
      label: 'Brand',
      value: data?.bus?.brand + `${'(' + data?.bus?.code + ')'}`,
    },
    {
      label: 'Color',
      value: data?.bus?.color,
    },
    {
      label: 'License Plate',
      value: data?.bus?.licensePlate,
    },
    {
      label: 'Model',
      value: data?.bus?.model,
    },
    {
      label: 'Seat',
      value: data?.bus?.seat,
    },
    {
      label: 'Status',
      value: data?.bus?.status,
    },
  ];

  const routeInfo = [
    {
      label: 'Beginning',
      value: data?.route?.beginning,
    },
    {
      label: 'Destination',
      value: data?.route?.destination,
    },
    {
      label: 'Distance',
      value: data?.route?.distance,
    },
    {
      label: 'Status',
      value: data?.route?.status,
    },
  ];

  return (
    <Screen>
      <Header title={'Coordination Detail'} />
      <ScrollView style={styles.content}>
        <Image source={{uri: data?.driver?.avatar}} style={styles.avatar} />
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <Text style={styles.headerSection}>Information Driver</Text>
          )}
          data={driveInfor}
          renderItem={({item}) => {
            return <ListItem label={item.label} value={item.value} />;
          }}
          ItemSeparatorComponent={() => <Divider />}
        />

        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <Text style={styles.headerSection}>Bus Information</Text>
          )}
          data={busInfor}
          renderItem={({item}) => {
            return <ListItem label={item.label} value={item.value} />;
          }}
          ItemSeparatorComponent={() => <Divider />}
        />

        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <Text style={styles.headerSection}>Routes</Text>
          )}
          data={routeInfo}
          renderItem={({item}) => {
            return <ListItem label={item.label} value={item.value} />;
          }}
          ItemSeparatorComponent={() => <Divider />}
        />
      </ScrollView>
    </Screen>
  );
};

export default CoordinationDetailScreen;
