import { Button, Header, InputField } from "@/components";
import { useLoading } from "@/hooks";
import { addTripStatusesService } from "@/services";
import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
const TripStatusesScreen = () => {
  const route = useRoute();
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation();
  const tripId = route.params.tripId;
  const stationId = route.params.item.stationId;
  

  console.log("TripID")
  console.log(tripId)
  console.log("StationId")
  console.log(stationId)

  const initialValues = {
    countUp: undefined,
    countDown: undefined,
  };

  const validationSchema = Yup.object().shape({
    countUp: Yup.number(),
    countDown: Yup.number(),
  });

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    resetForm,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    validateOnMount: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      if (values.countDown || values.countUp) {
        showLoading();
        addTripStatusesService(
          tripId,
          stationId,
          values.countUp,
          values.countDown
        )
        
          .then((data) => {
            if (data.statusCode === 200) {
              hideLoading();
              resetForm();
              navigation.goBack();
            } else {
              alert("Error from server");
            }
          })
          .catch((error) => {
            hideLoading();
            alert("Err");
            console.log(error)
          });
      }
    },
  });

  const onSubmit = () => {
    if (values.countDown == undefined && values.countUp == undefined) {
      alert("Enter count up or count down");
    } else {
      handleSubmit();
    }
  };

  const onPlusPress = () => {
    if (errors.countUp || !values.countUp) {
      setFieldValue("countUp", "1");
    } else {
      const num = Number(values.countUp) + 1;
      setFieldValue("countUp", num.toString());
    }
  };

  const onMinusPress = () => {
    if (errors.countDown || !values.countDown) {
      setFieldValue("countDown", "1");
    } else {
      const num = Number(values.countDown) + 1;
      setFieldValue("countDown", num.toString());
    }
  };

  return (
    <View>
      <Header title={`Station code: ${route.params?.item?.station?.code}`} />
      <View
        style={{
          padding: 20,
        }}
      > 
      <View>
         <Text style={styles.label}>Count up</Text>
      </View>
        <View style={styles.row}>
         
          <InputField
            value={values.countUp}
            inputStyle={styles.input}
            onChangeText={(text) => {
              setFieldValue("countUp", text);
              setFieldTouched("countUp", true, false);
            }}
            errorText={touched.countUp && errors.countUp && errors.countUp}
            placeholder={"Enter count up"}
            keyboardType={"numeric"}
          />
        </View>
        <Pressable onPress={onPlusPress} style={styles.iconButton}>
          <Icon name="plus" size={30} color="white" />
        </Pressable>

        <View style={styles.spacer} />
        <View>
         <Text style={styles.label}>Count up</Text>
      </View>
        <View style={styles.row}>
        
          <InputField
            value={values.countDown}
            inputStyle={styles.input}
            onChangeText={(text) => {
              setFieldValue("countDown", text);
              setFieldTouched("countDown", true, false);
            }}
            errorText={
              touched.countDown && errors.countDown && errors.countDown
            }
            placeholder={"Enter count down"}
            keyboardType={"numeric"}
          />
        </View>
        <Pressable onPress={onMinusPress} style={styles.iconButtonMinus}>
          <Icon name="minus" size={30} color="white" />
        </Pressable>

        <View style={styles.spacer} />
        <Button onPress={onSubmit} block title={"Submit"} />
      </View>
    </View>
  );
};

export default TripStatusesScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: 'black'
  },
  input: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  iconButton: {
    marginTop: 20,
    backgroundColor: "green",
    width: 200,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  iconButtonMinus: {
    marginTop: 20,
    backgroundColor: "#F60C30",
    width: 200,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  spacer: {
    marginBottom: 20,
  },
});