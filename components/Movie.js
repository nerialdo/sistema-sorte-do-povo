//https://goqr.me/api/doc/create-qr-code/
//https://goqr.me/api/doc/read-qr-code/
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
// import moment from "moment";

const POSTER_PATH = "https://image.tmdb.org/t/p/w154";
import logo from '../public/logo_sorte_do_povo.jpg';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  movieContainer: {
    width: '50%',
    // paddingBottom: 2,
    // paddingLeft: 2,
    height: 140.4,
    left: 0,
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
  },
  movieDetailsCanhoto: {
    display: "flex",
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  detalhesCanhoto:{
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  detalhesInfo:{
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  text:{
    fontSize: 8
  },
  text2:{
    fontSize: 8,
    color: '#ffff',
    padding: 2
  },
  movieDetails: {
    backgroundColor: '#26304d',
    padding: 5,
    display: "flex",
    flexDirection: 'column',
    width: '70%'
  },
  imgLogo: {
    with: 50 ,
    height: 'auto'
  },
  image: {
    height: 50,
    width: 50
  },
  viewHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    marginBottom: 12
  },
  rating: {
    height: 40,
    width: 40
  },

  detailsFooter: {
    display: "flex",
    flexDirection:"column",
  },
  detailsNumeros: {
    display: "flex",
    flexDirection:"row",
    marginTop: 5,
    marginBottom: 5
  },
  langCenter:{
    fontSize: 10,
    fontWeight: 700,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#f16522'
  },
  numeros: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    textAlign: 'center',
    color: '#ffff',
  },
});

export function PdfDocument(props) {
  console.log("pdf props", props.data);
  //
  return (
    <Document>
      <Page style={styles.page}>
        {props.data
          ? props.data.map((a, index) => {
            var array = {
              'numero': a.numero,
              'numeros': a.numeros,
              'sorteio': a.sorteio
            }
             var linkQrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${JSON.stringify(array)}&amp;size=100x100`
              return (
                <View key={index} style={styles.movieContainer}>
                  <View style={styles.movieDetailsCanhoto}>
                    <Image source={linkQrCode} style={styles.rating} />
                    {/* <img style={{width: 60, height: 60, padding: 5}} src={linkQrCode} /> */}
                    <View style={styles.detalhesCanhoto}>
                      <Text style={styles.text}>Bilhete nº {a.numero}</Text>
                      <Text style={styles.text}>Sorteio n°</Text>
                      <Text style={styles.text}>0001</Text>
                    </View>
                  </View>
                  <View style={styles.movieDetails}>
                    <View style={styles.viewHeader}>
                      {/* <img style={{width: 60, height: 60, padding: 5}} src={linkQrCode} />
                      <img style={{width: 60, height: 60, padding: 5}} src={logo.src} /> */}
                      <Image
                        style={styles.image}
                        source={logo.src}
                      />
                      <Image source={linkQrCode} style={styles.rating} />
                    </View>
                    <View style={styles.detailsFooter}>
                      <Text style={styles.langCenter}>
                        Sorteios diários
                      </Text>
                      <Text style={styles.langCenter}>
                        Este nunca acumula
                      </Text>
                    </View>
                    <View style={styles.detailsNumeros}>
                      <Text style={styles.numeros}>
                       {a.numeros[0]}
                      </Text>
                      <Text style={styles.numeros}>
                       {a.numeros[1]}
                      </Text>
                      <Text style={styles.numeros}>
                       {a.numeros[2]}
                      </Text>
                      <Text style={styles.numeros}>
                       {a.numeros[3]}
                      </Text>
                      <Text style={styles.numeros}>
                       {a.numeros[4]}
                      </Text>
                    </View>
                    <View style={styles.detailsFooter}>
                      <Text style={styles.langCenter}>
                        São 5 chances para ganhar
                      </Text>
                    </View>
                    <View style={styles.detalhesInfo}>
                      <Text style={styles.text2}>Bilhete nº {a.numero}</Text>
                      <Text style={styles.text2}>Sorteio n° {'0001'}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          : ""}
      </Page>
    </Document>
  );
}
