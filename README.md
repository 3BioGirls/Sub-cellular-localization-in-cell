Sub-cellular-localization-in-cell
==================================================================
Objective:

To visualize biological cells and highlight by a user selected sub-cellular compartments in a way that they stand out from the un-selected ones.

Input data:

- Input data file should be either a ".txt" or ".csv" file.
- Text file must contain proteins of only one type of cell.
- File’s first line should contain cell type (i.e: eukaryota, archea, bacteria)
- File's second line should contain Score (i.e: 0-100). Note: Minimum score should be zero.
- File's third line should contain columns description (i.e: Protein Id, Score, Localization).
- User’s file can have more than 3 columns but additional columns will not be executed.

Supported Web browsers: 

- Google Chrome

Implementation:

- First, all the cell compartments were identified by the paths that were marked using the GIMP image editor.
- The images of the different cell compartments were saved in svg file format.
- Using the information from the user's input file, the number of proteins present in each compartment were determined.
- Each compartment was highlighted using a localization color scale, which was obtained by converting the number of proteins present in each localization into a percentage and matched to a color.
- We included a table to display all the proteins present in each cell compartment and their scores.
- Upon 'mouseover' over a compartment, a tooltip was displayed, which shows the proteins present in that cell compartment, and the score (confidence) of the protein.
- The proteins displayed in the tooltip were made clickable so that the cell image could be updated to reflect the scores of the protein in all the cell compartments.
- Finally, the cell compartments were highlighted using a score color scale, which was obtained by mapping the score of a protein in each cell compartment to a color.


Description of color scale for localization and score:

-Localization:
The lightest color represents the minimum number of proteins in a cell compartment, in contrast, the darkest color represents the maximum number of proteins within a cell compartment. These values are also expressed in percentages where the lightest color matches with 0% and the darkest color with 100%.

-Score(confidence):
The color scale for score (confidence) is based on percentages from 0 to 100 % where 0 means low confidence and 100 means accurate confidence. 

