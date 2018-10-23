function start() {
    // récupère une référence vers l'élément body
    var body = document.getElementsByTagName("body")[0];

    // création des éléments <table> et <tbody>
    table     = document.createElement("table");
    tablebody = document.createElement("tbody");

    // création des cellules
    for(var j = 0; j < 2; j++) {
        // création d'un élément <tr>
        row = document.createElement("tr");

        for(var i = 0; i < 2; i++) {
            // création d'un élément <td>
            cell = document.createElement("td");
            // création d'un nœud texte
            texte = document.createTextNode("la cellule est ligne " + j + ", colonne " + i);
            // ajoute le nœud texte créé à la cellule <td>
            cell.appendChild(texte);
            // ajoute la cellule <td> à la ligne <tr>
            row.appendChild(cell);
        }
        // ajoute la ligne <tr> à l'élément <tbody>
        tablebody.appendChild(row);
    }

    // ajoute <tbody> à l'élément <table>
    table.appendChild(tablebody);
    // ajoute <table> à l'élément <body>
    body.appendChild(table);
    // définit l'attribut border de table à 2;
    table.setAttribute("border", "2");
}