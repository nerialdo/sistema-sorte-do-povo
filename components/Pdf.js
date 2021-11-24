import React, { useState, useEffect} from "react";
import Axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
// import { API_KEY } from "./constants";
import { PdfDocument } from "./Movie";

export default function MovieList({bilhetes, numerosorteio, qtobilhete}) {
  console.log('=====> ', bilhetes, numerosorteio, qtobilhete)
  const [year, setYear] = useState("");
  const [movieDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false);

  
  // useEffect(() => {
  //   setHide(true)
  //   setDetails(bilhetes);
  // }, [])

  const fetchMovie = e => {
    setHide(true)
    setDetails(bilhetes);
    // setYear(e.target.value);
    // try {
    //   let res = await Axios(
    //     `https://api.themoviedb.org/3/discover/movie?api_key=${'c0ae854ba8255b07b83c94d52ed26ea4'}&primary_release_year=${year}&sort_by=vote_average.desc`
    //   );
    //   console.log('res.data.results', res.data.results, typeof res.data.results, typeof bilhetes)
    //   setHide(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div style={{marginTop: 30, marginBottom: 30}} className="container">
      {bilhetes.length != 0 && (
        <select id="movies" className="select" onChange={fetchMovie}>
          <option defaultValue="">
            Selecione
          </option>
          <option value={'gerar'}>
              Gerar PDF
          </option>
        </select>
      )}
      {show && (
        <PDFDownloadLink
          document={<PdfDocument data={movieDetails} />}
          fileName="movielist.pdf"
          style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a",
            margin:10
          }}
        >
          {({ blob, url, loading, error }) =>
            loading ? `Loading document...` : "Download Pdf"
          }
        </PDFDownloadLink>
      )}
      {/* {show && (
        <PdfDocument style={{marginTop: 30}} data={movieDetails} />
      )} */}
    </div>
  );
}
