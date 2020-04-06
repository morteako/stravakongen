import React from "react";

export const InfoPage = props => {
  return (
    <div>
      {" "}
      <h1> Stravakongen </h1>
      <h2> Poengsystem </h2>
      Man kan sortere Stravakongen på flere måter, men det er **Poeng** som er
      den essentielle sorteringen. Den lager en slags totalkonkurranse av å
      kombinere plasseringene på flere segmenter til en større, morsommere og
      viktigere? konkurranse. Poengsystemet fungerer slik: - Det er om å gjøre å
      få **færrest** poeng - For hvert segment så får hver deltager like mange
      poeng som deltagerens plassering på ledertavla på dette segmentet. - Det
      vil si at 1. plass får 1 poeng, 17. plass får 17 poeng, osv, opp til og
      med 50. plass. - Fra 51. plass og oppover, så får alle 51 poeng. * Hvis
      man ikke har en registrert tid på et segment, så vil man få poeng basert
      på hvor mange i klubben som har en registrert tid. - Hvis 20 personer har
      en registrert tid på et segment, vil personer som ikke har en registrert
      tid få 21 poeng på dette segment. - Hvis det er over 50 registrerte tider,
      vil man likevel få 51 poeng. Dette grunnet at det kun hentes ut de 50
      raskeste per segment.
      <h2>Ekstra funksjonalitet</h2>
      <h3>Spesifiere klubb via URL-parameter</h3>
      Man kan spesifisere klubb ved å gi en klubb-id. Eksempel : Löplabbet Norge
      har klubb-id 450816. URL-en
      <h3>Lage egen segmentgruppe</h3>
      Hvis man har en noen segmenter man vil lage en ledertavle for, så er det
      mulig! Man må bare spesifisere segment-idene som et URL-parameter på
      formen `?segments=[id1, id2, id3, ....]` For eksempel for å lage egen
      segmentgruppe med Jarmyra (2641676) og ned Wyller (9773343) så kan man
      bruke URL-en{" "}
      <a href="https://morteako.github.io/stravakongen/#/?segments=[2641676,9773343]">
        https://morteako.github.io/stravakongen/#/?segments=[2641676,9773343]
      </a>
      <h2>Kildekode</h2>
      Kildekoden er tilgjengelig på{" "}
      <a href="https://github.com/morteako/stravakongen">Github </a>. Alle
      bidrag til forbedringer og ny funksjonalitet mottas med takk.
      <h2>Kontakt</h2>
      Spørsmål, svar
    </div>
  );
};

export default InfoPage;
