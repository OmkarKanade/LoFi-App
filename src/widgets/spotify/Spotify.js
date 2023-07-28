import React, { useState } from "react";
import { Card, Button, Input, Space } from "antd";
import { CloseOutlined, MinusOutlined, DragOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";

export default function Spotify({
  link,
  style = {},
  wide = false,
  width = wide ? "100%" : 300,
  height = wide ? 80 : 380,
  frameBorder = 0,
  allow = "encrypted-media; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  ...props
}) {
  const url = new URL(link);

  const handleclose = () => {
    // setURL({
    //   ...linkdata,
    //   url: "",
    //   playable: ReactPlayer.canPlay(""),
    // });
    props.handleclosesf(false);
  };

  return (
    props.closesf && (
      <Draggable
        bounds="html"
        handle=".handle"
        // defaultPosition={{ x: 20, y: 20 }}
      >
        <Card
          className="glassmor"
          size="small"
          title="Spotify"
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
                  onClick={props.handlevisiblesf}
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
            width: "330px",
            height: "220px",
            visibility: props.visiblesf ? "visible" : "hidden",
            opacity: props.visiblesf ? "1" : "0",
            transition: "all .2s",
          }}
        >
          <iframe
            title="Spotify Web Player"
            src={`https://open.spotify.com/embed${url.pathname}`}
            width={width}
            height={height}
            frameBorder={frameBorder}
            allow={allow}
            style={{
              height: "152px",
            }}
            //   "clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
          ></iframe>
        </Card>
      </Draggable>
    )
  );
}
