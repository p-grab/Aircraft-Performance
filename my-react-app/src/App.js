import { useState, useEffect } from "react";
import Header from "./components/Header";
import NumberInput from "./components/NumberInput";
import axios from "axios";
import Plotly from "plotly.js-dist-min";

const App = () => {
  const [proptype, setProptype] = useState("propeller");
  const [mass, setMass] = useState(2200);
  const [area, setArea] = useState("17.02");
  const [A, setA] = useState("0.0365");
  const [B, setB] = useState("-0.0011");
  const [C, setC] = useState("0.0265");
  const [g, setG] = useState("9.81");
  const [step, setStep] = useState("0.02");

  const [trace, setTrace] = useState([
    {
      x: ["giraffes", "orangutans", "monkeys"],
      y: [20, 14, 23],
      type: "bar",
    },
  ]);

  useEffect(() => {
    Plotly.newPlot("plot", trace);
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response = await axios.post("http://127.0.0.1:8000/calculate/", {
      proptype,
      mass,
      area,
      A,
      B,
      C,
      g,
      step,
    });
    console.log(response.data);
    console.log(response.data.V_gamma_list);
    setTrace(() => response.data);
  };
  return (
    <div className="flex">
      <div className="w-64">
        <Header />
        <form onSubmit={onSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select propulsion type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={proptype}
              name="proptype"
              id="propselect"
              onChange={(e) => setProptype(e.target.value)}
            >
              <option value="propeller">Propeller</option>
              <option value="jet">Jet</option>
            </select>
          </div>

          <label className="input-group">
            <span>BTC</span>
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <span>BTC</span>
            <input
              type="text"
              placeholder="0.01"
              className="input input-bordered"
            />
            <span>BTC</span>
          </label>
          <NumberInput
            label="Starting mass"
            unit="kg"
            value={mass}
            setter={setMass}
          />
          <NumberInput
            label="Wing area"
            unit="m^2"
            value={area}
            setter={setArea}
          />
          <NumberInput label="a" unit="none" value={A} setter={setA} />
          <NumberInput label="b" unit="none" value={B} setter={setB} />
          <NumberInput label="c" unit="none" value={C} setter={setC} />
          <NumberInput
            label="Acceleration"
            unit="m/s^2"
            value={g}
            setter={setG}
          />
          <NumberInput label="Step" unit="none" value={step} setter={setStep} />
          <input type="submit" value="Save Inputs" className="btn" />
        </form>
      </div>
      <div className="w-2/3">
        {/* <Navbar /> */}
        <div id="plot"></div>
      </div>
    </div>
  );
};

export default App;
