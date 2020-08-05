//ENTER THE DETAILS
const TRACKING_ID = "UA-174575643-1"; // UPDATE YOUR GOOGLE ANALYTICS TRACKING ID
const CLIENT_ID = "aa108adf83e246138b99aa9c97ee17b8"; //UPDATE YOUR ADOBE EMBED API CLIENT ID

// GOOGLE ANALYTICS
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);

ga("create", TRACKING_ID, "auto");
ga("send", "pageview");
//==========================================================
//index.js code
const fullWindowConfig = {
  defaultViewMode: "FIT_PAGE", //default mode fit_page
  showPageControls: true, //controls
  showAnnotationTools: true, //annotation tools
  showDownloadPDF: true, //download option
  showPrintPDF: true, //print option
  showLeftHandPanel: false, //remove other options
  dockPageControls: true, //dock
};
const sizedConfig = {
  defaultViewMode: "FIT_PAGE", //default mode is set to fit_page
  embedMode: "SIZED_CONTAINER", //display mode is set to sized-container
};
const inlineConfig = {
  defaultViewMode: "FIT_PAGE", //default mode is set to fit_page
  embedMode: "IN_LINE", //display mode is set to inline
};

/// for index.html tabs
//if (document.getElementById("tab-nav-1") != null) {
//  document.querySelector("#tab-nav-1").addEventListener("click", () => {
 //   PDFname = "fullwindow";
 //   viewPdf(fullWindowConfig, PDFname);
 // });
  //document.querySelector("#tab-nav-2").addEventListener("click", () => {
   // PDFname = "sized";
   // viewPdf(sizedConfig, PDFname);
  //});
  //document.querySelector("#tab-nav-3").addEventListener("click", () => {
  //  PDFname = "inline";
   // viewPdf(inlineConfig, PDFname);
  //});
//}

/// for individual view links
if (document.getElementById("fullwindow") != null) {
  PDFname = "fullwindow";
  viewPdf(fullWindowConfig, PDFname);
} 
if (document.getElementById("sized") != null) {
  PDFname = "sized";
  viewPdf(sizedConfig, PDFname);
}
if (document.getElementById("inline") != null){
  PDFname = "inline";
  viewPdf(inlineConfig, PDFname);
}

/// main view function
function viewPdf(viewerConfig, name_pdf) {
  document.addEventListener("adobe_dc_view_sdk.ready", function () {
    var adobeDCView = new AdobeDC.View({
      /* Pass your registered client id */
      clientId: CLIENT_ID,
      /* Pass the div id in which PDF should be rendered */
      divId: "adobe-dc-view",
    });
    adobeDCView.previewFile(
      {
        /* Pass information on how to access the file */
        content: {
          //enter the Location of PDF which needs to be displayed
          location: {
            url: "./pdfFiles/website.pdf",
          },
        },
        /* Pass meta data of file */
        metaData: {
          /* file name */
          fileName: name_pdf + ".pdf",
        },
      },
      viewerConfig
    );

    adobeDCView.registerCallback(
      AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
      function (event) {
        switch (event.type) {
          case "DOCUMENT_OPEN":
            ga(
              "send",
              "event",
              "DOCUMENT_OPEN",
              event.data.fileName,
              "open document"
            );
            break;
          case "PAGE_VIEW":
            ga(
              "send",
              "event",
              "PAGE_VIEW",
              `Page ${event.data.pageNumber} of ${event.data.fileName}`,
              "view page"
            );
            break;
          case "DOCUMENT_DOWNLOAD":
            ga(
              "send",
              "event",
              "DOCUMENT_DOWNLOAD",
              event.data.fileName,
              "download document"
            );
            break;
          case "TEXT_COPY":
            ga(
              "send",
              "event",
              "TEXT_COPY",
              `COPIED - ${event.data.copiedText} -FROM ${event.data.fileName}`,
              "copy text"
            );
            break;
          default:
        }
      },
      {
        enablePDFAnalytics: true, //turn on pdf analytics
      }
    );
  });
}
