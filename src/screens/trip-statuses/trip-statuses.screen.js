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
  const tripId = route.params.item?.id;
  const stationId = route.params.item.stationId;

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
        <View style={styles.row}>
          <InputField
            label={"Count up"}
            value={values.countUp}
            onChangeText={(text) => {
              setFieldValue("countUp", text);
              setFieldTouched("countUp", true, false);
            }}
            errorText={touched.countUp && errors.countUp && errors.countUp}
            placeholder={"Enter count up"}
            keyboardType={"numeric"}
          />
          <Pressable onPress={onPlusPress} style={styles.iconButton}>
            <Icon name="plus" size={30} color="white" />
          </Pressable>
        </View>
        <View style={styles.spacer} />

        <View style={styles.row}>
          <InputField
            label={"Count down"}
            value={values.countDown}
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
          <Pressable onPress={onMinusPress} style={styles.iconButton}>
            <Icon name="minus" size={30} color="white" />
          </Pressable>
        </View>
        <View style={styles.spacer} />
        <Button onPress={onSubmit} block title={"Submit"} />
      </View>
    </View>
  );
};

export default TripStatusesScreen;

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "green",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spacer: {
    marginBottom: 20,
  },
});
