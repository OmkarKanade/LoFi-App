import React, { useState, useEffect } from "react";
import { SoundOutlined, DragOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, Space, Input, Button } from "antd";
import Draggable from "react-draggable";
import { useMediaQuery } from "react-responsive";

const { Search } = Input;

export default function Dictionary(props) {
  const [meaningData, fetchMeaning] = useState({});
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  //   const sound = document.getElementById("sound");
  const handleSearch = async (inpWord) => {
    const response = await fetch(`${url}${inpWord}`);
    const data = await response.json();
    const partOfSpeech = data[0].meanings[0].partOfSpeech;
    const phonetic = data[0].phonetic;
    const meaning = data[0].meanings[0].definitions[0].definition;
    const synonyms = data[0].meanings[0].definitions[0].synonyms;
    const example = data[0].meanings[0].definitions[0].example;
    const audiourl = data[0].phonetics[0].audio;
    const audio = new Audio(audiourl);
    fetchMeaning({
      ...meaningData,
      inpWord: inpWord,
      partOfSpeech: partOfSpeech,
      phonetic: phonetic,
      meaning: meaning,
      synonyms: synonyms,
      example: example,
      audiourl: audiourl,
      audio: audio,
    });
  };

  const playSound = () => {
    meaningData.audio.play();
  };

  const handleclose = () => {
    fetchMeaning({});
    props.handlevisibledict();
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    props.visibledict && (
      <Draggable
        bounds="html"
        handle=".handle"
        // defaultPosition={{ x: 20, y: 20 }}
      >
        <Card
          className="glassmor"
          size="small"
          title="Dictionary"
          extra={
            <>
              <Space>
                <Button
                  type="text"
                  icon={<DragOutlined className="handle" />}
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
            width: isTabletOrMobile ? "300px" : "50%",
          }}
        >
          <Search
            placeholder="Enter Word"
            onSearch={handleSearch}
            enterButton
          />
          {meaningData.inpWord && (
            <>
              <p>
                {meaningData.inpWord}
                {meaningData.audiourl && (
                  <Button type="text" onClick={playSound}>
                    <SoundOutlined />
                  </Button>
                )}
              </p>
              <p>{meaningData.partOfSpeech}</p>
              <p>{meaningData.meaning}</p>
              <p>{meaningData.synonyms}</p>
              <p>{meaningData.example}</p>
            </>
          )}
        </Card>
      </Draggable>
    )
  );
}
