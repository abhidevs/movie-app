import React from "react";
import { Col, Typography } from "antd";
import { IMAGE_BASE_URL } from "../Config";
import "./style.css";

const { Title } = Typography;

function GridCards({
  actor,
  key,
  image,
  movieId,
  movieName,
  characterName,
  name,
}) {
  const POSTER_SIZE = "w154";

  if (actor) {
    return (
      <Col key={key} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            alt={characterName}
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
          />
          <h6 style={{ fontSize: "1rem", marginBottom: "0px" }}>
            Role : {characterName ? characterName : "unknown"}
          </h6>
          <h6 style={{ fontSize: "1rem", marginTop: "0px" }}>{name}</h6>
        </div>
      </Col>
    );
  } else {
    return (
      <a href={`/movie/${movieId}`}>
        <Col key={key} lg={6} md={8} xs={24}>
          <div className="movie-card">
            <img
              style={{ width: "100%", height: "320px" }}
              alt={movieName}
              src={image}
            />
            <Title level={2} className="movie-name">
              {movieName}
            </Title>
          </div>
        </Col>
      </a>
    );
  }
}

export default GridCards;
