import type { ProjectImportResponse } from "../models/project-import-response.js";
import { parseCsv } from "../utils/parse-csv.js";
import type { TimebutlerApiCaller } from "./api-caller.js";

/**
 * Calls the Timebutler API to import projects.
 *
 * @param caller The bound Timebutler API caller function.
 * @param csvdatafile The CSV file containing the project data.
 *
 * @return A promise resolving to a string containing the response from the Timebutler API.
 */
export function rawProjectsImport(
  caller: TimebutlerApiCaller,
  csvdatafile: File,
): Promise<string> {
  return caller("projectsimport", undefined, { csvdatafile });
}

/**
 * Mit dieser Aktion können neue Projekte in die Liste der Projekte importiert und bestehende Projekte geändert oder gelöscht werden.
 *
 * @param csvdatafile Datei mit den zu importierenden Daten im CSV-Format. Details zum Aufbau der Daten siehe weiter unten.
 *
 * **Aufbau der CSV-Datei**
 *
 * In der CSV-Datei werden die Projekt-Informationen übergeben. Je Zeile in der CSV-Datei wird ein Kommando für ein Projekt übergeben. Je Zeile kann also ein Projekt hinzugefügt oder geändert oder gelöscht werden. Die CSV darf keine Kopfzeilen beinhalten, sondern alle Zeilen ab der ersten Zeile werden verarbeitet und importiert. Dass Trennzeichen der Daten in einer Zeile der CSV-Datei ist das Semikolon (;).
 *
 * In jeder Zeile der CSV-Datei müssen folgende Daten in den Spalten übergeben werden:
 *
 * | Spalte / Wert | Beschreibung | Format / Beispiele |
 * | --- | --- | --- |
 * | **Erste Spalte**<br> <br> Eines der Kommandos  <br>`CREATE`  <br>`UPDATE`  <br>`DELETE` | Mit diesem Wert legen Sie fest, was mit den übergebenen Daten in der Zeile geschehen soll:<br><br>`CREATE`  <br>Es wird ein neues Projekt erstellt und gespeichert.<br><br>`UPDATE`  <br>Bestehendes Projekt ändern: In der Zeile muss die ID des zu ändernden Projekts übergeben werden (siehe Beschrebung zur nächsten Spalte). Falls es zu der ID ein Projekt gibt, dann werden die Angaben zum Projekt geändert. Falls es zu der ID kein Projekt gibt, dann wird eine Fehlermeldung zurückgegeben und die CSV-Zeile verworfen.<br><br>`DELETE`  <br>Bestehendes Projekt löschen: In der Zeile muss die ID des zu löschenden Projekts übergeben werden (siehe Beschrebung zur nächsten Spalte). Falls es zu der ID ein Projekt gibt, dann wird das Projekt gelöscht (falls es mindestens einen Arbeitszeit zu dem Projekt gibt, wird das Projekt nicht gelöscht und eine Fehlermeldung zurückgegeben). Falls es kein Projekt gibt, wird keine Aktion ausgeführt und es wird auch _keine_ Fehlermeldung zurückgegeben. | Eines der 3 Kommandos.<br><br>Beispiele:  <br>CREATE  <br>DELETE |
 * | **Zweite Spalte**<br> <br> ID des Projekts | Die ID des Projekts, das geändert oder gelöscht werden soll. Die Angabe der ID ist bei allen Kommandos obligatorisch mit Ausnahme von CREATE (in diesem Fall wird die ID ignoriert, falls sie dennoch übergeben wird).<br><br>Die Liste der von Timebutler vergebenen Projekt-IDs kann über den Endpunkt [`projects`](#actionprojects) abgerufen werden. | Die ID des Projekts<br><br>Beispiele:  <br>4711  <br>2367 |
 * | **Dritte Spalte**<br> <br> Name des Projekts | Der Name des Projekts, das erstellt werden soll (Kommando CREATE) bzw. der neue Name des Projekts (Kommando UPDATE). Diese Spalte kann beim Kommando DELETE leer bleiben.<br><br>Es sind maximal 150 Zeichen erlaubt. Zeilenumbrüche (Carriage Return oder Line Feed) sind nicht erlaubt, ebenso ist ein Semikolon nicht erlaubt, da dieses als Trennzeichen der CSV-Datei dient. | Der Name des Projekts, alphanumerisch<br><br>Beispiele:  <br>Pegasus  <br>Zeus II |
 * | **Vierte Spalte**<br> <br> Projekt aktiv?  <br>`true`  <br>`false` | Die Angabe, ob das Projekt aktiv (neue Zeiteinträge für das Projekt erlaubt) oder inaktiv (neue Zeiteinträge für das Projekt nicht erlaubt) ist. | Einer der beiden Werte:  <br>true  <br>false |
 * | **Fünfte Spalte**<br> <br> Projekt-Budget in ganzen Stunden | Die Anzahl Stunden für das Projekt-Budget. Die Angabe ist optional. Wenn angegeben, muss der Wert eine Ganzzahl größer oder gleich 0 sein. | Das Projektbudget in Stunden als ganze Zahl<br><br>Beispiele:  <br>32  <br>1200 |
 * | **Sechste Spalte**<br> <br> Auswahl einer Kategorie Pflicht?  <br>`true`  <br>`false` | Die Angabe, ob die Nutzer bei Zeiteinträgen auf dieses Projekt auch eine Kategorie auswählen müssen oder nicht. | Einer der beiden Werte:  <br>true  <br>false |
 * | **Siebte Spalte**<br> <br> Kommentar | Ein Kommentar als interner Vermerk. Wird nur Admin-Nutzern bei der online Bearbeitung der Projektliste angezeigt. Wird anderen Nutzern, die Arbeitszeiten auf Projekte buchen, nicht angezeigt.<br><br>Die Angabe ist optional. Es sind maximal 200 Zeichen erlaubt. Zeilenumbrüche (Carriage Return oder Line Feed) sind nicht erlaubt, ebenso ist ein Semikolon nicht erlaubt, da dieses als Trennzeichen der CSV-Datei dient. | Ein Kommentar für das Projekt als Text.<br><br>Beispiel:  <br>Das wichtigste Projekt in diesem Jahr. |
 */
export async function projectsImport(
  caller: TimebutlerApiCaller,
  csvdatafile: File,
): Promise<ProjectImportResponse[]> {
  const str = "line;state;projectId\n" +
    (await rawProjectsImport(caller, csvdatafile));
  return parseCsv<ProjectImportResponse>(str);
}
