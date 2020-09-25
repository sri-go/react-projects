import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Form, Input, Button, Typography, DatePicker, message } from "antd";

import { ProfileImage } from "./profileImage";

import * as ROUTES from "../../../constants/routes";
import { withFirebase } from "../../Firebase";

const INITIAL_STATE = {
  name: "",
  tagline: "",
  introduction: "",
  birthday: null,
  currentLocation: "",
  email: "",
  phoneNumber: "",
  hometown: "",
  igLink: "",
  linkedInLink: "",
  portfolioLink: "",
  graduationYear: "",
  initiationClass: "",
  degree: "",
  major: "",
  highschool: "",
};

const { Title } = Typography;

const ProfileForm = (props) => {
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const { authUser, firebase, history } = props;

  useEffect(() => {
    props.firebase.userProfile(authUser.uid).on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        form.setFieldsValue({
          name: data.name,
          tagline: data.tagline,
          introduction: data.introduction,
          birthday: data.birthday,
          currentLocation: data.currentLocation,
          email: data.email,
          phoneNumber: data.phoneNumber,
          hometown: data.hometown,
          igLink: data.igLink,
          linkedInLink: data.linkedInLink,
          portfolioLink: data.portfolioLink,
          graduationYear: data.graduationYear,
          initiationClass: data.initiationClass,
          degree: data.degree,
          major: data.major,
          highschool: data.highschool,
        });
        setProfileData({ ...data });
      } else {
        //on new profile submit or unsubmitted form
        props.firebase.user(authUser.uid).on("value", (snapshot) => {
          const data = snapshot.val();
          const { email, name } = data;
          form.setFieldsValue({
            name: data.name,
            email: data.email,
          });
          setProfileData({
            ...INITIAL_STATE,
            ...{ email: email, name: name },
          });
        });
      }
    });
    return () => props.firebase.userProfile(authUser.uid).off();
  }, []);

  // on form submit
  const onSubmit = (values) => {
    let stringifyData = JSON.parse(JSON.stringify(profileData));
    console.log("on submit data", stringifyData);

    //if file is added
    if (fileList.length > 0) {
      console.log(fileList[0]);
      firebase
        .profileImage(authUser.uid, fileList[0].name)
        .put(fileList[0].originFileObj)
        .then((snapshot) => {
          console.log(snapshot);
          let link = snapshot.ref.getDownloadURL();
          return link;
        })
        .then((downloadURL) => {
          stringifyData = { ...stringifyData, profileURL: downloadURL };
        })
        .then(() => {
          firebase
            .userProfile(authUser.uid)
            .update(stringifyData)
            .catch((error) => {
              setError(error);
              message.error(error.message, 3);
              console.log(error);
            });
        })
        .then(() => {
          onSuccess();
          // message.success("Successfully created profile!", 3);
        })
        .then(() => {
          history.push(ROUTES.HOME);
        })
        .catch((error) => {
          setError(error);
          message.error(error.message, 3);
          console.log(error);
        });
    }
    //if no pic is uploded
    if (fileList.length === 0) {
      console.log("url", stringifyData.profileURL);

      //if file exists -> remove from storage, and remove from db
      if (!!stringifyData.profileURL && deleteStatus) {
        console.log("pre-removal", stringifyData.profileURL);
        firebase.deleteFromStorage(stringifyData.profileURL);
        stringifyData = { ...stringifyData, profileURL: "" };
        firebase
          .userProfile(authUser.uid)
          .update(stringifyData)
          .then(() => {
            onSuccess();
            // message.success("Successfully updated profile!", 3);
          })
          .then(() => {
            history.push(ROUTES.HOME);
          })
          .catch((error) => {
            setError(error);
            message.error(error.message, 3);
            console.log(error);
          });
      }
      //else
      else {
        firebase
          .userProfile(authUser.uid)
          .update(stringifyData)
          .then(() => {
            onSuccess();
          })
          .then(() => {
            history.push(ROUTES.HOME);
          })
          .catch((error) => {
            setError(error);
            message.error(error.message, 3);
            console.log(error);
          });
      }
    }
  };

  const onSuccess = () => {
    message.success("Successfully created profile!", 3);
  };

  //on form change
  const onChange = (changedValues, allValues) => {
    console.log(allValues);
    const {
      name,
      tagline,
      introduction,
      birthday,
      currentLocation,
      email,
      phoneNumber,
      hometown,
      igLink,
      linkedInLink,
      portfolioLink,
      initiationClass,
      degree,
      major,
      highschool,
    } = allValues;

    setProfileData({
      ...profileData,
      name: name,
      tagline: tagline,
      introduction: introduction,
      birthday: birthday,
      currentLocation: currentLocation,
      email: email,
      phoneNumber: phoneNumber,
      hometown: hometown,
      igLink: igLink,
      linkedInLink: linkedInLink,
      portfolioLink: portfolioLink,
      initiationClass: initiationClass,
      degree: degree,
      major: major,
      highschool: highschool,
    });
  };

  const onChangeDate = (value, dateString) => {
    console.log(value, dateString);
  };

  //on form failure
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError(errorInfo);
  };

  const uploadPic = (filelist, deleteStatus) => {
    setFileList(filelist);
    setDeleteStatus(deleteStatus);
    // console.log("post filelist", fileList);
  };

  //form layout
  const layout = {
    layout: "horizontal",
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  //form validation
  const validateMessages = {
    required: "${label} is required",
    types: {
      email: "${label} is not a valid email",
      url: "${label} is not a valid url",
      number: "${label} is not a valid number",
    },
    number: {
      min: "'${name}' cannot be less than ${min}",
      max: "'${name}' cannot be greater than ${max}",
    },
  };

  return (
    <Form
      // {...layout}
      style={{ width: "50vw", alignItems: "start" }}
      form={form}
      name="profileForm"
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      onValuesChange={onChange}
      initialValues={{ ...profileData }}
      validateMessages={validateMessages}
    >
      {/* Profile Picture */}
      <ProfileImage
        style={{ width: "100vw", height: "100%" }}
        firebase={firebase}
        authUser={authUser}
        returnData={uploadPic}
      />
      {/* Personal Information */}
      <>
        <Title level={5} className="site-description-item-profile-p">
          Personal Information
        </Title>
        <Form.Item name="name" label="Name">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="tagline" label="Tag Line" required>
          <Input placeholder="Describe yourself in 10 words or less" />
        </Form.Item>
        <Form.Item name="introduction" label="Introduction">
          <Input.TextArea placeholder="Tell other alumni about yourself" />
        </Form.Item>
        <Form.Item name="birthday" label="Birthday">
          {/* <DatePicker picker="date" onChange={onChangeDate} /> */}
        </Form.Item>
        <Form.Item name="currentLocation" label="Current Location">
          <Input placeholder="Cleveland, OH" />
        </Form.Item>
      </>
      {/* Contact Information */}
      <>
        <Title level={5} className="site-description-item-profile-p">
          Contact Information
        </Title>
        <Form.Item name="email" label="Email">
          <Input rules={[{ required: true, type: "email" }]} />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone Number">
          <Input placeholder="Phone Number" type="tel" />
        </Form.Item>
        <Form.Item name="hometown" label="Hometown">
          <Input placeholder="Cleveland, OH" />
        </Form.Item>
        <Form.Item
          name="portfolioLink"
          label="Personal Website URL"
          rules={[{ type: "url" }]}
        >
          <Input placeholder="URL of your website" type="url" autoComplete="" />
        </Form.Item>
        <Form.Item
          name="linkedInLink"
          label="LinkedIn URL"
          rules={[{ type: "url" }]}
        >
          <Input placeholder="https://www.linkedin.com/" type="url" />
        </Form.Item>
        <Form.Item
          name="githubLink"
          label="GitHub Link"
          rules={[{ type: "url" }]}
        >
          <Input placeholder="https://www.github.com/" type="url" />
        </Form.Item>
        <Form.Item name="igLink" label="Instagram Handle">
          <Input
            placeholder="What's your IG Profile (ex: kingjames)"
            type="text"
          />
        </Form.Item>
      </>
      {/* Academic Information */}
      <>
        <Title level={5} className="site-description-item-profile-p">
          Academic Information
        </Title>
        <Form.Item
          name="graduationYear"
          label="Graduation Year"
          rules={[{ required: true, type: "number", min: 2014, max: 3000 }]}
        >
          {/* <DatePicker picker="year" onChange={onChangeDate} /> */}
        </Form.Item>
        <Form.Item
          name="initiationClass"
          label="Initation Class"
          rules={[
            {
              required: true,
              message: "Please input your initiation class!",
            },
          ]}
        >
          <Input placeholder="What Initiation Class Are You (Alpha, Beta...)" />
        </Form.Item>
        <Form.Item name="degree" label="Degree">
          <Input />
        </Form.Item>
        <Form.Item name="major" label="Major">
          <Input />
        </Form.Item>
        <Form.Item name="highschool" label="High School Name">
          <Input />
        </Form.Item>
      </>
      {/* Submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default compose(withRouter, withFirebase)(ProfileForm);
