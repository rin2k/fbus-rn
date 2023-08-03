import {
  Button,
  CustomModal,
  Divider,
  Header,
  InputField,
  QRCodeScannerPopup,
  Screen,
} from "@/components";
import { removeTask, setDriverInfo, setTask } from "@/redux";
import {
  addTripStatusesService,
  getCoordinationService,
  removeLocation,
} from "@/services";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "./component/list-item";
import styles from "./styles";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/AntDesign";
import { useFormik } from "formik";
import { SCREENS } from "@/constants";

const CoordinationDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const id = route.params.id;
  const routeId = route.params.routeId;
  const task = useSelector((state) => state?.task);
  const userRole = useSelector((state) => state?.user?.userInfor?.role);

  const hideToggle = route.params.hideToggle;

  console.log(hideToggle);

  const [data, setData] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [stationId, setStationId] = useState();
  const [busId, setBusId] = useState();

  // console.log("ID");
  // console.log(id);

  useEffect(() => {
    getCoordinationService(id)
      .then((res) => {
        // console.log(JSON.stringify(res));
        if (res.statusCode === 200) {
          if (res && res.driver) {
            dispatch(setDriverInfo(res.driver));
          }
          setData(res);
          setStationId(res.route.routeStations[0].stationId);
          setBusId(res.bus.id);
          const codeCheck = `${res?.bus?.code + "-" + res?.bus?.licensePlate}`;

          if (codeCheck == task?.code) {
            setIsEnabled(true);
          }
          // check ID để dùng 1 QR dc bật ở 1 detail coor
        } else {
          alert("Internal server error");
        }
      })
      .catch((error) => {
        alert("Internal server error");
        // Xử lý lỗi ở đây
        console.error("Error in getCoordinationService:", error);
      });
  }, []);

  // console.log("SADASDGSAHGDJSAHG")
  // console.log(JSON.stringify(data));
  // console.log("Bus ID")
  // console.log(busId)
  // console.log("Route ID")
  // console.log(routeId)
  const toggleSwitch = async () => {
    if (!isEnabled) {
      if (task.code) {
        dispatch(removeTask());
        checkPermissions();
      } else {
        checkPermissions();
      }
    } else {
      setIsEnabled(false);
      addTripStatusesService(id, stationId, 0, 0, false);
      removeLocation(routeId, busId);
      dispatch(removeTask());
    }
  };
  //thac mac
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

  const onBarCode = (qrData) => {
    try {
      const code = JSON.parse(qrData?.data);
      const codeCheck = `${data?.bus?.code + "-" + data?.bus?.licensePlate}`;
      if (code == codeCheck) {
        setIsVisibleModal(false);
        addTripStatusesService(id, stationId, 0, 0, true);
        dispatch(
          setTask({
            busId: data.bus.id,
            code: code,
            routeId: routeId,
          })
        );
        setIsEnabled(true);
      } else {
        navigation.goBack();
        alert("Not permission to drive!");
      }
    } catch (error) {
      setIsVisibleModal(false);
      alert("Not valid, please check again!");
    }
  };

  const onPressStation = (item) => {
    const tripId = item?.routeId;
    const stationId = item?.stationId;

    navigation.navigate(SCREENS.TRIP_STATUSES, {
      item,
      tripId: id,
    });
  };
  // console.log("stationId");
  // console.log(stationId);
  const renderStation = () => {
    return (
      <FlatList
        scrollEnabled={false}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => (
          <Text style={styles.headerSection}>Station</Text>
        )}
        data={data?.route?.routeStations}
        renderItem={({ item }) => {
          return (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item?.station?.image }}
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "grey",
                      marginRight: 12,
                    }}
                  />
                  <Text
                    style={{ fontWeight: "bold", color: "black", fontSize: 25 }}
                  >
                    {item?.station?.code}
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    onPressStation(item);
                  }}
                >
                  <Icon name="edit" size={24} color="blue" />
                </Pressable>
              </View>
            </>
          );
        }}
      />
    );
  };

  const renderContent = () => {
    if (data)
      return (
        <>
          {userRole == "admin" && (
            <>
              <Image
                source={{ uri: data?.driver?.avatar }}
                style={styles.avatar}
              />
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
            </>
          )}
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
          {renderStation()}
        </>
      );
  };

  return (
    <>
      <Screen>
        <Header
          title={"Trip Detail"}
          rightComponent={
            <>
              <Pressable onPress={toggleSwitch} disabled={hideToggle}>
                <Switch
                  disabled
                  thumbColor={"white"}
                  trackColor={"green"}
                  ios_backgroundColor={"red"}
                  value={isEnabled}
                />
              </Pressable>
            </>
          }
        />
        <ScrollView style={styles.content}>{renderContent()}</ScrollView>
      </Screen>
      {isVisibleModal && (
        <QRCodeScannerPopup
          visible={isVisibleModal}
          setVisible={setIsVisibleModal}
          onBarCodeRead={(qrData) => {
            onBarCode(qrData);
          }}
        />
      )}
    </>
  );
};

export default CoordinationDetailScreen;
