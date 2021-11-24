//https://dev.to/taikio/criando-documentos-pdf-com-reactjs-4lkl
export class Impressao {

    constructor(dadosParaImpressao) {
      this.dadosParaImpressao = dadosParaImpressao;
    }  
  
    async PreparaDocumento() {
      const corpoDocumento = this.CriaCorpoDocumento();
      const documento = this.GerarDocumento(corpoDocumento);
      return documento;
    }
  
    CriaCorpoDocumento() {
      const header = [
        { text: 'Nome Produto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        { text: 'Qtd. Estoque', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
        { text: 'Qtd. Vendido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      ];
      const body = this.dadosParaImpressao.map((prod) => {
        console.log("========+++++++ ", prod)
        // return [
        //   { text: prod.numeros, fontSize: 8 },
        //   { text: prod.sorteio, fontSize: 8 }
        // ];
        return [
          {
            style: 'bigger',
            width:200,
            columns: [
              {
                width:200,
                columns: [
                  {
                    width: 100,
                    text: prod.numeros
                  },
                  {
                    width: 100,
                    text: prod.sorteio
                  }
                ]
              }
            ]
          },
        ]
      });
      console.log("bodybodybodybody", body)
      const lineHeader = [
        {
          text:
            '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
          alignment: 'center',
          fontSize: 5,
          colSpan: 3,
        },
        {},
        {},
      ];
  
      // let content = [header];
      let content = [];
      content = [...body];
      // content = [
      //   [ 
      //     {
      //       style: 'bigger',
      //       columns: [
      //         {
      //           width: 280,
      //           table: {
      //             body: [
      //               [
      //                 {
      //                   rowSpan: 3,
      //                   border: undefined,
      //                   fillColor: '#eeeeff',
      //                   text: body
      //                 },
      //                 {
      //                   border: undefined,
      //                   fillColor: '#eeeeee',
      //                   text: 'border:\nundefined'
      //                 },
      //                 {
      //                   border: undefined,
      //                   fillColor: '#dddddd',
      //                   text: 'border:\n[true, false, false, false]'
      //                 }
      //               ],
      //               [
      //                 '',
      //                 {
      //                   colSpan: 2,
      //                   border: undefined,
      //                   fillColor: '#eeffee',
      //                   text: 'colSpan: 2\n\nborder:\n[true, true, true, true]'
      //                 },
      //                 ''
      //               ],
      //               [
      //                 '',
      //                 {
      //                   border: undefined,
      //                   fillColor: '#eeeeee',
      //                   text: 'border:\nundefined'
      //                 },
      //                 {
      //                   border: undefined,
      //                   fillColor: '#dddddd',
      //                   text: 'border:\n[false, false, true, true]'
      //                 }
      //               ]
      //             ]
      //           },
      //           layout: {
      //             defaultBorder: false,
      //           }
      //         },
              
      //       ],
      //       columnGap: 10,
      //     },
      //   ],
      // ]
      return content;
    }
  
    GerarDocumento(corpoDocumento) {
      console.log("corpoDocumentocorpoDocumentocorpoDocumentocorpoDocumentocorpoDocumento", corpoDocumento)
      const documento = {
        pageSize: 'A4',
        pageMargins: [14, 53, 14, 48],
        header: function () {
          return {
              margin: [14, 12, 14, 0],
              layout: 'noBorders',
              table: {
                widths: ['50%'],
                body: [                             
                  [
                    { text: 'Bilhetes', style: 'reportName' }
                  ]              
                ],
              },
            };
        },
        content: [
          {
            layout: 'noBorders',
            table: {              
              headerRows: 1,
              // widths: [ '*', 55, 55 ],
              body: corpoDocumento
            }
          },
        ],
        footer(currentPage, pageCount) {
          return {
            layout: 'noBorders',
            margin: [14, 0, 14, 22],
            table: {
              widths: ['auto'],
              body: [
                [
                  {
                    text:
                      '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                    alignment: 'center',
                    fontSize: 5,
                  },
                ],
                [
                  [
                    {
                      text: `Página ${currentPage.toString()} de ${pageCount}`,
                      fontSize: 7,
                      alignment: 'right',
                      /* horizontal, vertical */
                      margin: [3, 0],
                    },
                    {
                      text: '© Sorte do Povo',
                      fontSize: 7,
                      alignment: 'center',
                    },
                  ],
                ],
              ],
            },
          };
        },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        },
        bigger:{
          // background: 'blue'
        }
      },
  
    };
      return documento;
    }
  }