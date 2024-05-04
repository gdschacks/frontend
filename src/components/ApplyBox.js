import "./ApplyBox.scss";

import Grid from "@mui/material/Grid";
import Button from "./ui-components/Button";

export default function ApplyBox(props) {
  return (
    <div className="apply_box">
      <Grid container>
        <Grid item sm={12} lg={3} className="user_img">
          <img alt="user" src={props.img} />
        </Grid>
        <Grid item sm={12} lg={9} className="content">
          <h1>{props.name} </h1>
          <h3>Role - {props.role}</h3>
          <div className="text">
            <p>
              <span>
                {props.description}
              </span>{" "}
            </p>
          </div>
          <Button text="Apply" click={props.click} />
        </Grid>
      </Grid>
    </div>
  );
}
