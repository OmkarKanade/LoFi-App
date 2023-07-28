import { useState, useEffect } from "react";
import { FloatButton } from "antd";
import Lofi1 from "../../images/lofi-1.jpg";
import Lofi2 from "../../images/lofi-2.jpg";
import Lofi3 from "../../images/lofi-3.jpg";
import Lofi4 from "../../images/lofi-4.jpg";

import {
  QuestionCircleOutlined,
  SyncOutlined,
  YoutubeOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

export default function SideWidget(props) {
  const [index, setIndex] = useState(1);
  const arr = [Lofi1, Lofi2, Lofi3, Lofi4];

  useEffect(() => {
    // Preload images when the component mounts
    preloadImages(arr);
  }, []);

  const preloadImages = (images) => {
    images.forEach((image) => {
      new Image().src = image;
    });
  };

  const handleyt = () => {
    if (!props.closeyt) {
      props.handlevisibleyt();
    }
    props.handlecloseyt(true);
    props.handlevisibleyt();
  };

  const handlesf = () => {
    if (!props.closesf) {
      props.handlevisiblesf();
    }
    props.handleclosesf(true);
    props.handlevisiblesf();
  };

  const handledict = () => {
    props.handlevisibledict();
  };

  const handlechange = () => {
    setIndex((index + 1) % arr.length);
    document.getElementById(
      "html"
    ).style.backgroundImage = `url(${arr[index]})`;
  };

  return (
    <FloatButton.Group shape="square">
      <FloatButton
        className="glassmor"
        icon={<QuestionCircleOutlined />}
        tooltip={<div>Info</div>}
        onClick={props.showDrawer}
      />
      <FloatButton
        className="glassmor"
        tooltip={<div>Toggle Dictionary</div>}
        onClick={handledict}
      />
      {/* <FloatButton icon={<SyncOutlined />} /> */}
      <FloatButton
        className="glassmor"
        icon={<YoutubeOutlined />}
        tooltip={<div>Toggle Youtube Player</div>}
        onClick={handleyt}
      />
      <FloatButton
        className="glassmor"
        icon={<PlayCircleOutlined />}
        tooltip={<div>Toggle Spotify</div>}
        onClick={handlesf}
      />
      <FloatButton
        className="glassmor"
        icon={<SyncOutlined />}
        tooltip={<div>Change</div>}
        onClick={handlechange}
      />
    </FloatButton.Group>
  );
}
