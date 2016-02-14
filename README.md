# LanguageMentor

[http://language-mentor-1133.appspot.com/](http://language-mentor-1133.appspot.com/)

Simple WebApplication to learn foreign words.  
It is a hobby project.  
I am making it, because the language learning challenges me and  
I can get to know some technologies like Spring MVC, AngularJS, App Engine and App Script.  

## Behavior:

### Application:
Main page has the topics.  
Sub-pages have the Collections of topics.  

In first step the application show a phrase and play its sound.  
In second step it shows the translated phrase and the example sentences.  
In the next step is same first step with different phrase.  
It will repeat with group of phrases.  
(You can go to next step with play button of control panel or space, enter and left button on keyboard)  
(You can shuffle the phrases of current collection on control panel)  

A group is a part of collection. It consists of ten phrases.  
(You can change group on control panel or with left and right arrow)  
(You can extend the group from collection first element to group last element  
with to click to group display or to press up button on keyboard)  

The application read data from a Google Spreadsheet file.  

### Spreadsheet:
A sheet in the file means a topic in the application.  
First column of a sheet contains phrases of source language.  
Second column contains phonetic forms of phrases. (optional)  
Third column contains external link to sounds of phrases. (optional)  
If first column of a row is empty, translation data of this row belong to previous row.  

Fourth column contains translated phrases.  
Fifth same second.  
Sixth same third.  

Seventh column contains example sentences phrases in source language.  
Eighth same second.  
Ninth same third.  

Tenth  column contains example sentences phrases in target language.  
Eleventh same second.  
Twelfth same third.  

The project contains a script in App Script to automatic fill the phonetic and sound fields.  
(src/main/appscript)  
