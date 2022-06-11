import React from "react";
import { jsPDF,HTMLOptionImage } from "jspdf";
// import { toPng,toCanvas } from "html-to-image";


const GeneratePdf = ({ html }) => {
  const generatePdf = () => {
      const doc = new jsPDF();

      let split=doc.splitTextToSize(document.getElementById("text2").innerText,500);
    //   let image = document.getElementById("image").getAttribute('src');
    //   doc.text(document.querySelector(".content > h1").innerHTML,75,5);
//     doc.addPage()
//     doc.addPage()
//     doc.text('I am on page 3', 10, 10)
//     doc.setPage(1)
// doc.text('I am on page 1', 10, 10)
//       doc.addImage(image,70,7,60,60);
//       doc.text(split,5,75);
//       doc.output("dataurlnewwindow");  

doc.html(document.getElementById("text2"), {
    callback: function (doc) {
      doc.save();
    },
    autoPaging: true,
    width: 300,
    windowWidth: 1500
    // x: 10,
    // y: 10
 });
//  doc.output("dataurlnewwindow");
      

  };

  const generateImage=async ()=>{
    // const image = await toPng(html.current,{quality:0.95});
    const doc = new jsPDF();

    //   doc.addImage(image,'JPEG',5,22,200,160);
      doc.save();


  }
  return (

    <div className="button-container">
        {/* <button onClick={generateImage}>
            Get PDF using image
        </button> */}
        <button onClick={generatePdf}>
            Get PDF as text
        </button>
    </div>

  );
};

export default GeneratePdf;