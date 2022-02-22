
  const agora = () => {
    const dia = new Date();
    let dd = dia.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    let mm = dia.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    let yy = dia.getFullYear();
    let hoje = yy + "-" + mm + "-" + dd;
    return hoje;
  };

  function convertData(dataInput) {
    let data = new Date(dataInput);
    let dataFormatada = data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
    return dataFormatada;
  }

  export {agora, convertData};