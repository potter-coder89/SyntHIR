import FHIR from "fhirclient";
// import { useSearchParams } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { OnStartDibs } from "../onStart/onStartDibs";
import { OnStartSynthir } from "../onStart/onStartSynthir";

export const Authentication = (props) => {
  const clinetIDDibs = "";
  const clientSecretDibs = "";
  const clientSecretSynthir = "";
  const clientIDSynthir = "";
  const accessTokenUrl =
    "https://login.microsoftonline.com/35xxxxxf7d4-7xxxx-xxxxxxxxxxxxx/oauth2/token";
  const redirectUri = "http://localhost:3000/";
  const [accessToken, setAccessToken] = useState("");
  function urlParam(p) {
    var query = window.location.search.replace(/^\?/, "");
    var data = query.split("&");
    var result = [];
    var i, item;

    for (i = 0; i < data.length; i++) {
      item = data[i].split("=");
      if (item[0] === p) {
        return decodeURIComponent(item[1].replace(/\+/g, "%20"));
      }
    }

    return null;
  }

  const authorize = () => {
    // case 2 iss = "dibs..."
    // let launch = searchParams.get("launch")
    // if (!launch) {
    // 	launch = ""
    // }

    FHIR.oauth2
      .authorize({
        iss: props.iss,
        redirectUri: redirectUri,
        client_id: clientIDSynthir,
        // "clientSecret": "BgI8Q~rYw5BeSMO8x46XbMGky-q-Cf8Imvri~a.O",
        response_type : "code",
        scope: "openid",
        launch: "",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch FHIR Metadata page and SMART configuration from " +
            props.iss +
            "/Metadata"
        );
      });
  };
  var code = urlParam("code");
  function fetchToken() {
    var data = {
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      client_id: clientIDSynthir,
      client_secret: clientSecretSynthir,
      code: code,
      resource: props.iss,
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(accessTokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAccessToken(data.accessToken);
      });
  }
  // return null
  return (
    <>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={authorize}
      >
        Auhtorize
      </Button>

      <Button
        style={{ backgroundColor: "red", color: "white", marginLeft: 20 }}
        onClick={fetchToken}
      >
        Get Access Token
      </Button>
      {accessToken ? (
        props.iss === "" ? (
          <OnStartSynthir accessToken={accessToken} />
        ) : (
          <OnStartDibs accessToken={accessToken} />
        )
      ) : null}
    </>
  );
};
