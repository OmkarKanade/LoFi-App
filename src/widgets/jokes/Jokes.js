import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";

export default function Jokes() {
  const [jokedata, fetchjoke] = useState(
    "जिंदगी में थोड़े कांड भी करने चाहिये नहीं तो बुढ़ापे में गंगा में क्या धोओगे कच्छे"
  );
  const [showjoke, setshowjoke] = useState(true);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = async () => {
    setshowjoke(false);
    api.open({
      message: "Joke",
      description: jokedata,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement: "top",
      duration: 5,
      style: {
        cursor: "auto",
      },
      onClose: () => {
        setshowjoke(true);
      },
    });
    const url =
      "https://hindi-jokes-api.onrender.com/jokes/?api_key=5a7b32b44725b9a69f271b79c763";
    const response = await fetch(url);
    const data = await response.json();
    fetchjoke(data.jokeContent);
  };

  return (
    <>
      {contextHolder}
      {showjoke && (
        <Button className="glassmorc" onClick={openNotification} shape="circle">
          <SmileOutlined />
        </Button>
      )}
    </>
  );
}
