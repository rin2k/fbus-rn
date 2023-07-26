import { Button, Header, InputField } from "@/components";
import { useLoading } from "@/hooks";
import { addTripStatusesService } from "@/services";
import { useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import React from "react";
import { View } from "react-native";
import * as Yup from "yup";

const TripStatusesScreen = () => {
  const route = useRoute();
  const { showLoading, hideLoading } = useLoading();

  const tripId = route.params.item?.routeId;
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
            hideLoading();
            resetForm();
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

  return (
    <View>
      <Header title={`Station code: ${route.params?.item?.station?.code}`} />
      <View
        style={{
          padding: 20,
        }}
      >
        <InputField
          label={"Count up"}
          value={values.countUp}
          onChangeText={(text) => {
            setFieldValue("countUp", text);
            // setFieldTouched("countUp", true, false);
          }}
          // errorText={touched.countUp && errors.countUp && errors.countUp}
          placeholder={"Enter count up"}
          keyboardType={"numeric"}
        />

        <InputField
          label={"Count down"}
          value={values.countDown}
          onChangeText={(text) => {
            setFieldValue("countDown", text);
            // setFieldTouched("countDown", true, false);
          }}
          // errorText={touched.countDown && errors.countDown && errors.countDown}
          placeholder={"Enter count down"}
          keyboardType={"numeric"}
        />

        <Button onPress={onSubmit} block title={"Submit"} />
      </View>
    </View>
  );
};

export default TripStatusesScreen;
