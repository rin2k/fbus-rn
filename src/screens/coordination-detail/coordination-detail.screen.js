import { Divider, Header, QRCodeScannerPopup, Screen } from "@/components";
import { removeTask, setTask } from "@/redux";
import { getCoordinationService } from "@/services";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./component/list-item";
import styles from "./styles";

const CoordinationDetailScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  // const id = route.params.id;
  const id = 5;

  const [data, setData] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const nn = useSelector((sate) => sate.task.id);

  useEffect(() => {
    getCoordinationService(id).then((data) => {
      setData(data);
    });
  }, []);

  const toggleSwitch = async () => {
    if (!isEnabled) {
      checkPermissions();
    } else {
      setIsEnabled(false);
      dispatch(removeTask());
    }
  };

  const showModal = () => {
    setIsVisibleModal(true);
  };

  const checkPermissions = async () => {
    const cameraPermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    const locationPermissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (
      cameraPermissionStatus !== RESULTS.GRANTED ||
      locationPermissionStatus !== RESULTS.GRANTED
    ) {
      requestPermissions();
    } else {
      showModal();
    }
  };

  const requestPermissions = async () => {
    const cameraPermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
    const locationPermissionStatus = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (
      cameraPermissionStatus !== RESULTS.GRANTED ||
      locationPermissionStatus !== RESULTS.GRANTED
    ) {
      Alert.alert(
        "Permissions Required",
        "Please grant camera and location permissions."
      );
    } else {
      showModal();
    }
  };

  const driveInfor = [
    {
      label: "Fullname",
      value: data?.driver?.fullName,
    },
    {
      label: "Email",
      value: data?.driver?.personalEmail,
    },
    {
      label: "Phone number",
      value: data?.driver?.phoneNumber,
    },
    {
      label: "Birthday",
      value: data?.driver?.dateOfBirth
        ? moment(data?.driver?.dateOfBirth).format("DD-MM-YYYY")
        : null,
    },
    {
      label: "Gender",
      value: data?.driver?.gender.trim(),
    },
    {
      label: "Address",
      value: data?.driver?.address,
    },
  ];

  const busInfor = [
    {
      label: "Brand",
      value: data?.bus?.brand + `${"(" + data?.bus?.code + ")"}`,
    },
    {
      label: "Color",
      value: data?.bus?.color,
    },
    {
      label: "License Plate",
      value: data?.bus?.licensePlate,
    },
    {
      label: "Model",
      value: data?.bus?.model,
    },
    {
      label: "Seat",
      value: data?.bus?.seat,
    },
    {
      label: "Status",
      value: data?.bus?.status,
    },
  ];

  const routeInfo = [
    {
      label: "Beginning",
      value: data?.route?.beginning,
    },
    {
      label: "Destination",
      value: data?.route?.destination,
    },
    {
      label: "Distance",
      value: data?.route?.distance,
    },
    {
      label: "Status",
      value: data?.route?.status,
    },
  ];

  return (
    <>
      <Screen>
        <Header title={"Coordination Detail" + nn} />
        <ScrollView style={styles.content}>
          <Image source={{ uri: data?.driver?.avatar }} style={styles.avatar} />
          <Pressable onPress={toggleSwitch}>
            <Switch
              disabled
              thumbColor={"white"}
              trackColor={"green"}
              ios_backgroundColor={"red"}
              value={isEnabled}
            />
          </Pressable>
          <FlatList
            scrollEnabled={false}
            ListHeaderComponent={() => (
              <Text style={styles.headerSection}>Information Driver</Text>
            )}
            data={driveInfor}
            renderItem={({ item }) => {
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
            renderItem={({ item }) => {
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
            renderItem={({ item }) => {
              return <ListItem label={item.label} value={item.value} />;
            }}
            ItemSeparatorComponent={() => <Divider />}
          />
        </ScrollView>
      </Screen>
      {isVisibleModal && (
        <QRCodeScannerPopup
          visible={isVisibleModal}
          setVisible={setIsVisibleModal}
          onBarCodeRead={(data) => {
            setIsVisibleModal(false);
            dispatch(setTask(123));
            setIsEnabled(true);
          }}
        />
      )}
    </>
  );
};

export default CoordinationDetailScreen;
