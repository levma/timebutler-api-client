"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawTimeImportByEvents = rawTimeImportByEvents;
exports.timeImportByEvents = timeImportByEvents;
const parse_csv_js_1 = require("../utils/parse-csv.js");
/**
 * Calls the Timebutler API to import worktime by events.
 *
 * @param {TimebutlerApiCaller} caller - The bound Timebutler API caller function.
 * @param {File} csvdatafile - The CSV file containing the worktime data.
 * @param {UserIdentificationParamter} [useridentification] - The user identification object.
 *
 * @return {Promise<string>} The result of the API call as a string.
 */
function rawTimeImportByEvents(caller, csvdatafile, useridentification) {
    const params = useridentification
        ? { useridentification }
        : undefined;
    return caller("timeimportbyevents", params, { csvdatafile });
}
/**
 * Mit dieser Aktion können die Arbeitszeiteinträge von Stempeluhr-Terminals von Drittanbietern nach Timebutler importiert werden. Das Stempeluhr-Terminal kann die aufgezeichneten Stempeluhr-Ereignisse (Start, Pause, Stop) an Timebutler übermitteln und Timebutler wandelt diese Ereignisse in Arbeitszeiteinträge um.
 *
 * @param useridentification Um die Zeiteinträge zu den Mitarbeitern zuordnen zu können, muss bei dem Import der Daten entweder die Email-Adresse des Mitarbeiters oder die Mitarbeiternummer übergeben werden. Mit diesem Parameter wird festgelegt, ob in den importierten Daten die Email-Adresse oder die Mitarbeiternummer angegeben ist, wie folgt:
 *
 * **Parameterwert `email` oder Parameter nicht angegeben:** in den Import-Daten ist die Email-Adresse angegeben.
 *
 * **Parameterwert `employeenumber`:** in den Import-Daten ist die Mitarbeiternummer angegeben.
 *
 * @param csvdatafile Datei mit den zu importierenden Daten im CSV-Format. Details zum Aufbau der Daten siehe weiter unten.
 *
 * **Aufbau der CSV-Datei**
 *
 * In der CSV-Datei werden die Daten mit den Stempeluhr-Ereignissen übergeben. Je Zeile in der CSV-Datei wird ein Ereignis für einen Mitarbeiter übergeben. Die CSV darf keine Kopfzeilen beinhalten, es werden also alle Zeilen ab der ersten Zeile verarbeitet und importiert. Dass Trennzeichen der Daten in einer Zeile der CSV-Datei ist das Semikolon (;).
 *
 * In jeder Zeile der CSV-Datei müssen folgende Daten in den Spalten übergeben werden:
 *
 * | Spalte / Wert | Beschreibung | Format / Beispiele |
 * | --- | --- | --- |
 * | **Erste Spalte**<br> <br>Email-Adresse des Mitarbeiters oder Mitarbeiternummer | Bei den Request-Parametern kann im Parameter "useridentification" (siehe oben) angegeben werden, ob in der CSV-Datei die Email-Adresse des Mitarbeiters oder die Mitarbeiternummer angegeben ist. Entsprechend der Einstellung im Request Parameter muss in der CSV-Datei in dieser Spalte immer entweder die Email-Adresse des Mitarbeiters stehen oder immer die Mitarbeiternummer. | Email oder Mitarbeiternummer<br><br>Beispiele:  <br>sarah@example.com  <br>MA0209 |
 * | **Zweite Spalte**<br> <br>Zeitstempel | Datum und Uhrzeit, an dem das Ereignis aufgetreten ist (minutengenau). | `jjjj-mm-tt**T**hh:mm`  <br>Das T bleibt unverändert, die anderen Buchstaben werden ersetzt:<br><br>*   jjjj=Jahr<br>*   mm=Monat 01-12<br>*   tt=Tag 01-31<br>*   hh=Stunde 00-23<br>*   mm=Minuten 00-59<br><br>Beispiele:  <br>2024-03-31T17:58  <br>(= 31. März 2024, 17:58 Uhr)  <br>  <br>2024-12-02T07:08  <br>(= 2. Dezember 2024, 7:08 Uhr) |
 * | **Dritte Spalte**<br> <br>Einer der Ereignistypen  <br>`START`  <br>`STOP`  <br>`PAUSE`  <br>`RESUME` | Mit dem Ereignistyp wird festgelegt, welches Ereignis zu dem übergebenen Zeitpunkt stattgefunden hat:<br><br>`START`  <br>Stempeluhr wurde gestartet / Aufzeichnung gestartet<br><br>`STOP`  <br>Stempeluhr wurde gestoppt / Aufzeichnung beendet<br><br>`PAUSE`  <br>Stempeluhr wurde auf Pause gesetzt, Aufzeichnung der Pause wurde gestartet<br><br>`RESUME`  <br>Pause an der Stempeluhr wurde beendet, Aufzeichnung der Arbeitszeit wurde fortgesetzt | Einer der 4 angegebenen Ereignis-Typen.<br><br>Beispiele:  <br>START  <br>PAUSE |
 * | **Vierte Spalte**<br> (optional)<br><br>Die ID des Projekts, auf das der Arbeitszeiteintrag gebucht werden soll. | Die Angabe ist optional. Nur beim Ereignistyp `STOP` wird dieser Parameter verarbeitet, bei allen anderen Ereignistypen wird er ignoriert.<br><br>Die ID des Projekts erhalten Sie über den API-Aufruf `projects` ([siehe hier](#actionprojects)). Die Aktion `projects` brauchen Sie nur einmalig aufrufen. Die zurückgegebenen projectid-Werte können Sie auf Ihrem System speichern und wiederverwenden, ohne die Aktion `projects` nochmal aufrufen zu müssen, da sich die projectid nie ändert. | Beispiele:  <br>4711  <br>32977 |
 * | **Fünfte Spalte**<br> (optional)<br><br>Die ID der Kategorie, auf die der Arbeitszeiteintrag gebucht werden soll. | Die Angabe ist optional. Nur beim Ereignistyp `STOP` wird dieser Parameter verarbeitet, bei allen anderen Ereignistypen wird er ignoriert.<br><br>Die ID der Kategorie erhalten Sie über den API-Aufruf `services` ([siehe hier](#actionservices)). Die Aktion `services` brauchen Sie nur einmalig aufrufen. Die zurückgegebenen projectid-Werte können Sie auf Ihrem System speichern und wiederverwenden, ohne die Aktion `services` nochmal aufrufen zu müssen, da sich die serviceid nie ändert. | Beispiele:  <br>4711  <br>32977 |
 * | **Sechste Spalte**<br> (optional)<br><br>Die Bemerkungen zu dem Arbeitszeiteintrag (einzeilig, keine Zeilenumbrüche). | Die Angabe ist optional. Nur beim Ereignistyp `STOP` wird dieser Parameter verarbeitet, bei allen anderen Ereignistypen wird er ignoriert.<br><br>Wenn Bemerkungen angegeben sind, dann müssen diese in einer Zeile ohne Zeilenumbruch und ohne Sonderzeichen eingetragen sein. Ein Semikolon kann nicht verwendet werden, da das Semikolon als Trennzeichen für die CSV-Datei dient. | Beispiel:  <br>Wie besprochen habe ich an dem Tag später gestartet. |
 */
async function timeImportByEvents(caller, csvdatafile, useridentification) {
    const str = await rawTimeImportByEvents(caller, csvdatafile, useridentification);
    if (str === "OK") {
        return { success: true };
    }
    const errors = await (0, parse_csv_js_1.parseCsv)("line;error\n" + str);
    return { success: false, errors };
}
