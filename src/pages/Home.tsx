import { useEffect, useState } from "react";
import infoIcon from "../images/infoicon.svg";
import check from "../images/check.svg";
import "../styles/style.css";
import CurrencyInput from "react-currency-input-field";
export function Home() {
  const [tipoRend, setTipoRend] = useState(0);
  const [tipoIndex, setTipoIndex] = useState(0);
  const [valueCdi, setValueCdi] = useState<any>([]);
  const [valueIpca, setValueIpca] = useState<any>([]);
  const [valueSimulacoes, setValueSimulacoes] = useState<any>([]);
  const [aporteInicial, setAporteI] = useState(0);
  const [aporteMensal, setAporteM] = useState(0);
  const [rentabilidade, setRentabilidade] = useState(0);
  const [prazo, setPrazo] = useState(0);
  const [rendimentoApi, setRendimentoApi] = useState("bruto");
  const [indexApi, setIndexApi] = useState("pos");

  useEffect(() => {
    getValueCdi();
    async function getValueCdi() {
      await fetch("http://localhost:3000/indicadores?nome=cdi", {
        headers: {
          "content-type": "application/json",
          "REST-range": "resources=0-500",
        },
      })
        .then((res) => res.json())
        .then((data) => setValueCdi(data));
    }

    getValueIpca();
    async function getValueIpca() {
      await fetch("http://localhost:3000/indicadores?nome=ipca", {
        headers: {
          "content-type": "application/json",
          "REST-range": "resources=0-500",
        },
      })
        .then((res) => res.json())
        .then((data) => setValueIpca(data));
    }
  }, []);

  useEffect(() => {
    getSimulacoes();
    async function getSimulacoes() {
      await fetch(
        `http://localhost:3000/simulacoes?tipoIndexacao=${indexApi}&tipoRendimento=${rendimentoApi}`,
        {
          headers: {
            "content-type": "application/json",
            "REST-range": "resources=0-500",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setValueSimulacoes(data));
    }
  }, [rendimentoApi, indexApi]);

  function chooseRendimento(doubleBtn: number) {
    let leftDBtn1 = document.getElementById("left-btn-1");
    let leftDBtn2 = document.getElementById("left-btn-2");
    let checkLeft1 = document.getElementById("check-left-1");
    let checkLeft2 = document.getElementById("check-left-2");

    document.getElementById("right")!.style.visibility="hidden"


    if (doubleBtn === 0) {
      leftDBtn1!.style.backgroundColor = "#ED8E53";
      leftDBtn1!.style.color = "#FFFFFF";
      leftDBtn2!.style.backgroundColor = "#EFEFEF";
      leftDBtn2!.style.color = "#000000";
      checkLeft1!.style.display = "flex";
      checkLeft2!.style.display = "none";
      return setTipoRend(1), setRendimentoApi("bruto");
    } else {
      leftDBtn1!.style.backgroundColor = "#EFEFEF";
      leftDBtn1!.style.color = "#000000";
      leftDBtn2!.style.backgroundColor = "#ED8E53";
      leftDBtn2!.style.color = "#FFFFFF";
      checkLeft1!.style.display = "none";
      checkLeft2!.style.display = "flex";
      return setTipoRend(2), setRendimentoApi("liquido");
    }
  }

  function chooseIndex(tripleBtn: number) {
    let rightTBnt1 = document.getElementById("right-btn-1");
    let rightTBnt2 = document.getElementById("right-btn-2");
    let rightTBnt3 = document.getElementById("right-btn-3");
    let checkRight1 = document.getElementById("check-right-1");
    let checkRight2 = document.getElementById("check-right-2");
    let checkRight3 = document.getElementById("check-right-3");

    document.getElementById("right")!.style.visibility="hidden"

    if (tripleBtn == 0) {
      rightTBnt1!.style.backgroundColor = "#ED8E53";
      rightTBnt1!.style.color = "#FFFFFF";
      rightTBnt2!.style.backgroundColor = "#EFEFEF";
      rightTBnt2!.style.color = "#000000";
      rightTBnt3!.style.backgroundColor = "#EFEFEF";
      rightTBnt3!.style.color = "#000000";
      checkRight1!.style.display = "flex";
      checkRight2!.style.display = "none";
      checkRight3!.style.display = "none";
      return setTipoIndex(1), setIndexApi("pre");
    } else if (tripleBtn == 1) {
      rightTBnt1!.style.backgroundColor = "#EFEFEF";
      rightTBnt1!.style.color = "#000000";
      rightTBnt2!.style.backgroundColor = "#ED8E53";
      rightTBnt2!.style.color = "#FFFFFF";
      rightTBnt3!.style.backgroundColor = "#EFEFEF";
      rightTBnt3!.style.color = "#000000";
      checkRight1!.style.display = "none";
      checkRight2!.style.display = "flex";
      checkRight3!.style.display = "none";
      return setTipoIndex(2), setIndexApi("pos");
    } else {
      rightTBnt1!.style.backgroundColor = "#EFEFEF";
      rightTBnt1!.style.color = "#000000";
      rightTBnt2!.style.backgroundColor = "#EFEFEF";
      rightTBnt2!.style.color = "#000000";
      rightTBnt3!.style.backgroundColor = "#ED8E53";
      rightTBnt3!.style.color = "#FFFFFF";
      checkRight1!.style.display = "none";
      checkRight2!.style.display = "none";
      checkRight3!.style.display = "flex";
      return setTipoIndex(3), setIndexApi("ipca");
    }
  }

  function handleSetAporte(value: any, name: any) {
    if (name == "aporte-i") {
      setAporteI(parseFloat(value));
    } else {
      setAporteM(parseFloat(value));
    }
  }

  function handleSetRentabilidade(value: any) {
    setRentabilidade(parseInt(value));
  }

  function handleSubmit() {
    let isAporteINull;
    let isPrazoNull;
    let isAporteMNull;
    let isRentabilidadeNull;

    let aporteIWarn = document.getElementById("aporte-i-warn");
    let aporteILabel = document.getElementById("aporte-i-label");
    let inputAporteI = document.getElementById("aporte-i");

    let prazoWarn = document.getElementById("prazo-warn");
    let prazoLabel = document.getElementById("prazo-label");
    let inputPrazo = document.getElementById("prazo");

    let aporteMWarn = document.getElementById("aporte-m-warn");
    let aporteMLabel = document.getElementById("aporte-m-label");
    let inputAporteM = document.getElementById("aporte-m");

    let rentabilidadeWarn = document.getElementById("rentabilidade-warn");
    let rentabilidadeLabel = document.getElementById("rentabilidade-label");
    let inputRentabilidade = document.getElementById("rentabilidade");

    let submitBtn = document.getElementById("left-submit-btn");
    let right = document.getElementById("right");

    if (aporteInicial >= 1) {
      isAporteINull = false;
    } else {
      isAporteINull = true;
    }

    if (prazo >= 1) {
      isPrazoNull = false;
    } else {
      isPrazoNull = true;
    }

    if (aporteMensal >= 1) {
      isAporteMNull = false;
    } else {
      isAporteMNull = true;
    }

    if (rentabilidade >= 1) {
      isRentabilidadeNull = false;
    } else {
      isRentabilidadeNull = true;
    }

    if (isAporteINull) {
      aporteIWarn!.style.visibility = "visible";
      aporteILabel!.style.color = "#ff0000";
      inputAporteI!.style.borderColor = "#ff0000";
    } else {
      aporteIWarn!.style.visibility = "hidden";
      aporteILabel!.style.color = "#000000";
      inputAporteI!.style.borderColor = "#000000";
    }

    if (isPrazoNull) {
      prazoWarn!.style.visibility = "visible";
      prazoLabel!.style.color = "#ff0000";
      inputPrazo!.style.borderColor = "#ff0000";
    } else {
      prazoWarn!.style.visibility = "hidden";
      prazoLabel!.style.color = "#000000";
      inputPrazo!.style.borderColor = "#000000";
    }

    if (isAporteMNull) {
      aporteMWarn!.style.visibility = "visible";
      aporteMLabel!.style.color = "#ff0000";
      inputAporteM!.style.borderColor = "#ff0000";
    } else {
      aporteMWarn!.style.visibility = "hidden";
      aporteMLabel!.style.color = "#000000";
      inputAporteM!.style.borderColor = "#000000";
    }

    if (isRentabilidadeNull) {
      rentabilidadeWarn!.style.visibility = "visible";
      rentabilidadeLabel!.style.color = "#ff0000";
      inputRentabilidade!.style.borderColor = "#ff0000";
    } else {
      rentabilidadeWarn!.style.visibility = "hidden";
      rentabilidadeLabel!.style.color = "#000000";
      inputRentabilidade!.style.borderColor = "#000000";
    }

    if (
      isAporteINull == false &&
      isPrazoNull == false &&
      isAporteMNull == false &&
      isRentabilidadeNull == false
    ) {
      submitBtn!.style.backgroundColor = "#ed8e53";
      right!.style.visibility = "visible";
    } else {
      submitBtn!.style.backgroundColor = "#969696";
    }
  }

  return (
    <div className="container">
      <main>
        <div className="title">
          <h1>Simulador de Investimentos</h1>
        </div>

        <div className="sides">
          <div className="left">
            <div className="sim-title">
              <h2>Simulador</h2>
            </div>

            <form>
              <div className="columns">
                <div className="col-a">
                  <div className="label-image">
                    <label>Rendimento</label>
                    <img src={infoIcon} alt="Informações" />
                  </div>

                  <div className="double-button">
                    <button
                      id="left-btn-1"
                      type="button"
                      onClick={() => chooseRendimento(0)}
                    >
                      <img src={check} id="check-left-1" /> Bruto
                    </button>
                    <button
                      id="left-btn-2"
                      type="button"
                      onClick={() => chooseRendimento(1)}
                    >
                      <img src={check} id="check-left-2" />
                      Líquido
                    </button>
                  </div>

                  <label id="aporte-i-label">Aporte Inicial</label>

                  <div className="aporte-i-div">
                    <div className="aporte-m-input-label">
                      <CurrencyInput
                        className="aporte-inicial"
                        id="aporte-i"
                        name="aporte-i"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        prefix="R$ "
                        min={1}
                        decimalsLimit={2}
                        decimalSeparator={","}
                        groupSeparator={"."}
                        maxLength={10}
                        onValueChange={(value, name) =>
                          handleSetAporte(value, name)
                        }
                        required
                      />
                    </div>
                    <label id="aporte-i-warn">Não pode ser vazio.</label>
                  </div>

                  <div className="prazo">
                    <div className="prazo-input-label">
                      <label id="prazo-label">Prazo (em meses)</label>
                      <input
                        type="number"
                        name="prazo"
                        id="prazo"
                        min={1}
                        max={120}
                        maxLength={3}
                        onChange={(event) =>
                          setPrazo(parseInt(event.target.value))
                        }
                        required
                      />
                    </div>

                    <label id="prazo-warn">Não pode ser vazio.</label>
                  </div>

                  <div className="ipca">
                    <label className="ipca-label">IPCA (ao ano)</label>
                    <div className="ipca-div">
                      {valueIpca.map((ipca: any) => (
                        <input
                          type="text"
                          value={ipca.valor + "%"}
                          readOnly
                          id="ipca-input"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-b">
                  <div className="label-image">
                    <label>Tipos de indexação</label>
                    <img src={infoIcon} alt="Informações" />
                  </div>

                  <div className="triple-button">
                    <button
                      id="right-btn-1"
                      type="button"
                      onClick={() => chooseIndex(0)}
                    >
                      <img src={check} id="check-right-1" /> PRÉ
                    </button>
                    <button
                      id="right-btn-2"
                      type="button"
                      onClick={() => chooseIndex(1)}
                    >
                      <img src={check} id="check-right-2" />
                      POS
                    </button>
                    <button
                      id="right-btn-3"
                      type="button"
                      onClick={() => chooseIndex(2)}
                    >
                      <img src={check} id="check-right-3" /> FIXADO
                    </button>
                  </div>

                  <label id="aporte-m-label">Aporte Mensal</label>
                  <div className="aporte-i-div">
                    <div className="aporte-m-input-label">
                      <CurrencyInput
                        className="aporte-mensal"
                        id="aporte-m"
                        name="aporte-m"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        prefix="R$ "
                        decimalsLimit={2}
                        min={1}
                        decimalSeparator={","}
                        groupSeparator={"."}
                        maxLength={10}
                        onValueChange={(value, name) =>
                          handleSetAporte(value, name)
                        }
                        required
                      />
                    </div>
                    <label id="aporte-m-warn">Não pode ser vazio.</label>
                  </div>

                  <div className="rentabilidade">
                    <div className="rentabilidade-input-label">
                      <label id="rentabilidade-label">Rentabilidade</label>
                      <CurrencyInput
                        id="rentabilidade"
                        name="rentabilidade"
                        allowDecimals={false}
                        allowNegativeValue={false}
                        min={1}
                        maxLength={3}
                        onValueChange={(value, name) =>
                          handleSetRentabilidade(value)
                        }
                        suffix="%"
                        required
                      />
                    </div>
                    <label id="rentabilidade-warn">Não pode ser vazio.</label>
                  </div>

                  {valueCdi.map((cdi: any) => (
                    <div className="cdi">
                      <label>CDI (ao ano)</label>
                      <input type="text" value={cdi.valor + "%"} readOnly />
                    </div>
                  ))}
                </div>
              </div>

              <div className="left-buttons">
                <button id="clear-fields" type="button">
                  Limpar Campos
                </button>
                <button
                  id="left-submit-btn"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Simular
                </button>
              </div>
            </form>
          </div>

          <div className="right" id="right">
            <div className="right-content">
              <div className="result-title">
                <h2>Resultado da Simulação</h2>
              </div>

              <div className="boxes">
                <div className="box-1">
                  <label>Valor final Bruto</label>
                  {valueSimulacoes.map((simulacao: any) => (
                    <CurrencyInput
                      value={simulacao.valorFinalBruto}
                      id="input-result"
                      prefix="R$ "
                      groupSeparator="."
                      decimalSeparator=","
                      readOnly
                    />
                  ))}
                </div>

                <div className="box-2">
                  <label>Alíquota do IR</label>
                  {valueSimulacoes.map((simulacao: any) => (
                    <CurrencyInput
                      value={simulacao.aliquotaIR}
                      id="input-result"
                      suffix="%"
                      groupSeparator="."
                      decimalSeparator=","
                      readOnly
                    />
                  ))}
                </div>

                <div className="box-3">
                  <label>Valor Pago em IR</label>
                  {valueSimulacoes.map((simulacao: any) => (
                    <CurrencyInput
                      value={simulacao.valorPagoIR}
                      id="input-result"
                      prefix="R$ "
                      groupSeparator="."
                      decimalSeparator=","
                      readOnly
                    />
                  ))}
                </div>

                <div className="box-4">
                  <label>Valor Final Líquido</label>
                  {valueSimulacoes.map((simulacao: any) => (
                    <CurrencyInput
                    value={simulacao.valorFinalLiquido}
                    id="input-result"
                    prefix="R$ "
                    groupSeparator="."
                    decimalSeparator=","
                    readOnly
                  />
                  ))}
                </div>

                <div className="box-5">
                  <label>Valor Total Investido</label>
                  {valueSimulacoes.map((simulacao: any) => (
                    <CurrencyInput
                    value={simulacao.valorTotalInvestido}
                    id="input-result"
                    prefix="R$ "
                    groupSeparator="."
                    decimalSeparator=","
                    readOnly
                  />
                  ))}
                </div>

                <div className="box-6">
                  <label>Ganho Líquido</label>
                  {valueSimulacoes.map((simulacao: any) => (
                    <CurrencyInput
                    value={simulacao.ganhoLiquido}
                    id="input-result"
                    prefix="R$ "
                    groupSeparator="."
                    decimalSeparator=","
                    readOnly
                  />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}