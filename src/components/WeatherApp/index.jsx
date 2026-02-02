import { Button, Card, Col, Form, Input, message, Row, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { weatherApi } from "../../store/slice/weatherSlice";
import { useDispatch, useSelector } from "react-redux";
import humidity_pic from "/humidity.png";
import wind_pic from "/wind.png";
import Loader from "../Loader";
import "./weather.css";

const WeatherApp = () => {
  const { Title, Paragraph } = Typography;
  const dispatch = useDispatch();
  const data = useSelector((store) => store.weatherSlice.weatherData);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
  if (data?.main && data?.wind && data?.weather) {
    const iconCode = data.weather[0].icon; // eg: 10d

    setWeather({
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      temprature: Math.round(data.main.temp),
      location: data.name,
      iconCode: iconCode,
      iconUrl: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
    });
  }
}, [data]);


  const handleClick = () => {
    if (!city.trim()) {
      return message.error("Enter City Name");
    }
    dispatch(weatherApi(city));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",}}>

      <Card style={{ width: 400 }} className="card-color">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div style={{ display: "flex", gap: 8 }}>
              <Input value={city} onChange={(e) => setCity(e.target.value)} type="search"placeholder="Search"className="rounded-pill"/>
              <Button icon={<SearchOutlined />} className="rounded-circle"onClick={handleClick}/>
            </div>
          </Col>

          {data ? (
            <>
              <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                <img src={weather?.iconUrl} alt="weather" width={150} />
              </Col>

              <Col span={24} style={{ display: "flex", flexDirection: "column",alignItems: "center",}}>
                <Title level={4} className="text-white">
                  {weather?.temprature} °C
                </Title>
                <Paragraph className="text-white">
                  {weather?.location}
                </Paragraph>
              </Col>

              <Col span={12} style={{ display: "flex", gap: 12 }}>
                <img src={humidity_pic} alt="humidity" height={25} />
                <div className="text-white">
                  <p style={{ margin: 0 }}>{weather?.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </Col>

              <Col span={12} style={{ display: "flex", gap: 12 }}>
                <img src={wind_pic} alt="wind" height={25} />
                <div className="text-white">
                  <p style={{ margin: 0 }}>{weather?.windSpeed} km/h</p>
                  <span>Wind Speed</span>
                </div>
              </Col>
            </>
          ) : (
            <Loader/>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default WeatherApp;
