import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Card, Button, Input, Space } from "antd";
import { CloseOutlined, MinusOutlined, DragOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import { useMediaQuery } from "react-responsive";

const { Search } = Input;

export default function Youtube(props) {
  const [linkdata, setURL] = useState(["", false]);

  const updatelink = (url) => {
    setURL({
      ...linkdata,
      url: url,
      playable: ReactPlayer.canPlay(url),
    });
  };

  const handleclose = () => {
    setURL({
      ...linkdata,
      url: "",
      playable: ReactPlayer.canPlay(""),
    });
    props.handlecloseyt(false);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    props.closeyt && (
      <Draggable
        bounds="html"
        handle=".handle"
        // defaultPosition={{ x: 20, y: 20 }}
      >
        <Card
          className="glassmor"
          size="small"
          title="Youtube Player"
          extra={
            <>
              <Space>
                <Button
                  type="text"
                  icon={<DragOutlined className="handle" />}
                />
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={props.handlevisibleyt}
                />
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={handleclose}
                />
              </Space>
            </>
          }
          style={{
            visibility: props.visibleyt ? "visible" : "hidden",
            opacity: props.visibleyt ? "1" : "0",
            transition: "all .2s",
            width: isTabletOrMobile ? "300px" : "50%",
          }}
        >
          <Search
            placeholder="Paste Youtube Link"
            onSearch={updatelink}
            enterButton
          />
          {isDesktopOrLaptop && linkdata.playable && (
            <ReactPlayer
              style={{
                marginTop: "5%",
                margin: "auto",
              }}
              url={linkdata.url}
              controls={true}
              width={"100%"}
            />
          )}
          {isTabletOrMobile && linkdata.playable && (
            <ReactPlayer
              style={{
                marginTop: "5%",
                margin: "auto",
              }}
              url={linkdata.url}
              controls={true}
              width={"100%"}
              height={"180px"}
            />
          )}
        </Card>
      </Draggable>
    )
  );
}
