import { countryFlag } from "../../utils/countryFlag";
import { ReactComponent as Sun } from "../../assets/Sun.svg";
import { ReactComponent as Moon } from "../../assets/Moon.svg";

export const CityInfo = ({
    cityInfo
}) => (
    <section className="App__Data">
        <div className="App__Data--Basic">
        <h2>{cityInfo.name}</h2>
        {" , "}
        <span>{countryFlag(cityInfo.country)}</span>
        </div>
        <div className="App__Data--Advanced">
        <div className="App__Data--Datetime">
            <Sun width={"48px"} height={"48px"} />
            <em>Sunrise at: </em>
            <p>{new Date(cityInfo.sunrise).toLocaleTimeString()}</p>
        </div>
        <hr className="App__Data--Separator" />
        <div className="App__Data--Datetime">
            <Moon width={"48px"} height={"48px"} />
            <em>Sunset at: </em>
            <p>{new Date(cityInfo.sunset).toLocaleTimeString()}</p>
        </div>
        </div>
    </section>
);