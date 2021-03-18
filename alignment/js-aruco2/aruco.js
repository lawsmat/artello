/*
Copyright (c) 2020 Damiano Falcioni
Copyright (c) 2011 Juan Mellado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
References:
- "ArUco: a minimal library for Augmented Reality applications based on OpenCv"
  http://www.uco.es/investiga/grupos/ava/node/26
- "js-aruco: a port to JavaScript of the ArUco library"
  https://github.com/jcmellado/js-aruco
*/

var AR = {};
var CV = this.CV || require('./cv').CV;
this.AR = AR;

AR.DICTIONARIES = {
  ARUCO: {
    nBits: 25,
    tau: 1,
    codeList: ['0x1084210UL', '0x1084217UL', '0x1084209UL', '0x108420eUL', '0x10842f0UL', '0x10842f7UL', '0x10842e9UL', '0x10842eeUL', '0x1084130UL', '0x1084137UL', '0x1084129UL', '0x108412eUL', '0x10841d0UL', '0x10841d7UL', '0x10841c9UL', '0x10841ceUL', '0x1085e10UL', '0x1085e17UL', '0x1085e09UL', '0x1085e0eUL', '0x1085ef0UL', '0x1085ef7UL', '0x1085ee9UL', '0x1085eeeUL', '0x1085d30UL', '0x1085d37UL', '0x1085d29UL', '0x1085d2eUL', '0x1085dd0UL', '0x1085dd7UL', '0x1085dc9UL', '0x1085dceUL', '0x1082610UL', '0x1082617UL', '0x1082609UL', '0x108260eUL', '0x10826f0UL', '0x10826f7UL', '0x10826e9UL', '0x10826eeUL', '0x1082530UL', '0x1082537UL', '0x1082529UL', '0x108252eUL', '0x10825d0UL', '0x10825d7UL', '0x10825c9UL', '0x10825ceUL', '0x1083a10UL', '0x1083a17UL', '0x1083a09UL', '0x1083a0eUL', '0x1083af0UL', '0x1083af7UL', '0x1083ae9UL', '0x1083aeeUL', '0x1083930UL', '0x1083937UL', '0x1083929UL', '0x108392eUL', '0x10839d0UL', '0x10839d7UL', '0x10839c9UL', '0x10839ceUL', '0x10bc210UL', '0x10bc217UL', '0x10bc209UL', '0x10bc20eUL', '0x10bc2f0UL', '0x10bc2f7UL', '0x10bc2e9UL', '0x10bc2eeUL', '0x10bc130UL', '0x10bc137UL', '0x10bc129UL', '0x10bc12eUL', '0x10bc1d0UL', '0x10bc1d7UL', '0x10bc1c9UL', '0x10bc1ceUL', '0x10bde10UL', '0x10bde17UL', '0x10bde09UL', '0x10bde0eUL', '0x10bdef0UL', '0x10bdef7UL', '0x10bdee9UL', '0x10bdeeeUL', '0x10bdd30UL', '0x10bdd37UL', '0x10bdd29UL', '0x10bdd2eUL', '0x10bddd0UL', '0x10bddd7UL', '0x10bddc9UL', '0x10bddceUL', '0x10ba610UL', '0x10ba617UL', '0x10ba609UL', '0x10ba60eUL', '0x10ba6f0UL', '0x10ba6f7UL', '0x10ba6e9UL', '0x10ba6eeUL', '0x10ba530UL', '0x10ba537UL', '0x10ba529UL', '0x10ba52eUL', '0x10ba5d0UL', '0x10ba5d7UL', '0x10ba5c9UL', '0x10ba5ceUL', '0x10bba10UL', '0x10bba17UL', '0x10bba09UL', '0x10bba0eUL', '0x10bbaf0UL', '0x10bbaf7UL', '0x10bbae9UL', '0x10bbaeeUL', '0x10bb930UL', '0x10bb937UL', '0x10bb929UL', '0x10bb92eUL', '0x10bb9d0UL', '0x10bb9d7UL', '0x10bb9c9UL', '0x10bb9ceUL', '0x104c210UL', '0x104c217UL', '0x104c209UL', '0x104c20eUL', '0x104c2f0UL', '0x104c2f7UL', '0x104c2e9UL', '0x104c2eeUL', '0x104c130UL', '0x104c137UL', '0x104c129UL', '0x104c12eUL', '0x104c1d0UL', '0x104c1d7UL', '0x104c1c9UL', '0x104c1ceUL', '0x104de10UL', '0x104de17UL', '0x104de09UL', '0x104de0eUL', '0x104def0UL', '0x104def7UL', '0x104dee9UL', '0x104deeeUL', '0x104dd30UL', '0x104dd37UL', '0x104dd29UL', '0x104dd2eUL', '0x104ddd0UL', '0x104ddd7UL', '0x104ddc9UL', '0x104ddceUL', '0x104a610UL', '0x104a617UL', '0x104a609UL', '0x104a60eUL', '0x104a6f0UL', '0x104a6f7UL', '0x104a6e9UL', '0x104a6eeUL', '0x104a530UL', '0x104a537UL', '0x104a529UL', '0x104a52eUL', '0x104a5d0UL', '0x104a5d7UL', '0x104a5c9UL', '0x104a5ceUL', '0x104ba10UL', '0x104ba17UL', '0x104ba09UL', '0x104ba0eUL', '0x104baf0UL', '0x104baf7UL', '0x104bae9UL', '0x104baeeUL', '0x104b930UL', '0x104b937UL', '0x104b929UL', '0x104b92eUL', '0x104b9d0UL', '0x104b9d7UL', '0x104b9c9UL', '0x104b9ceUL', '0x1074210UL', '0x1074217UL', '0x1074209UL', '0x107420eUL', '0x10742f0UL', '0x10742f7UL', '0x10742e9UL', '0x10742eeUL', '0x1074130UL', '0x1074137UL', '0x1074129UL', '0x107412eUL', '0x10741d0UL', '0x10741d7UL', '0x10741c9UL', '0x10741ceUL', '0x1075e10UL', '0x1075e17UL', '0x1075e09UL', '0x1075e0eUL', '0x1075ef0UL', '0x1075ef7UL', '0x1075ee9UL', '0x1075eeeUL', '0x1075d30UL', '0x1075d37UL', '0x1075d29UL', '0x1075d2eUL', '0x1075dd0UL', '0x1075dd7UL', '0x1075dc9UL', '0x1075dceUL', '0x1072610UL', '0x1072617UL', '0x1072609UL', '0x107260eUL', '0x10726f0UL', '0x10726f7UL', '0x10726e9UL', '0x10726eeUL', '0x1072530UL', '0x1072537UL', '0x1072529UL', '0x107252eUL', '0x10725d0UL', '0x10725d7UL', '0x10725c9UL', '0x10725ceUL', '0x1073a10UL', '0x1073a17UL', '0x1073a09UL', '0x1073a0eUL', '0x1073af0UL', '0x1073af7UL', '0x1073ae9UL', '0x1073aeeUL', '0x1073930UL', '0x1073937UL', '0x1073929UL', '0x107392eUL', '0x10739d0UL', '0x10739d7UL', '0x10739c9UL', '0x10739ceUL', '0x1784210UL', '0x1784217UL', '0x1784209UL', '0x178420eUL', '0x17842f0UL', '0x17842f7UL', '0x17842e9UL', '0x17842eeUL', '0x1784130UL', '0x1784137UL', '0x1784129UL', '0x178412eUL', '0x17841d0UL', '0x17841d7UL', '0x17841c9UL', '0x17841ceUL', '0x1785e10UL', '0x1785e17UL', '0x1785e09UL', '0x1785e0eUL', '0x1785ef0UL', '0x1785ef7UL', '0x1785ee9UL', '0x1785eeeUL', '0x1785d30UL', '0x1785d37UL', '0x1785d29UL', '0x1785d2eUL', '0x1785dd0UL', '0x1785dd7UL', '0x1785dc9UL', '0x1785dceUL', '0x1782610UL', '0x1782617UL', '0x1782609UL', '0x178260eUL', '0x17826f0UL', '0x17826f7UL', '0x17826e9UL', '0x17826eeUL', '0x1782530UL', '0x1782537UL', '0x1782529UL', '0x178252eUL', '0x17825d0UL', '0x17825d7UL', '0x17825c9UL', '0x17825ceUL', '0x1783a10UL', '0x1783a17UL', '0x1783a09UL', '0x1783a0eUL', '0x1783af0UL', '0x1783af7UL', '0x1783ae9UL', '0x1783aeeUL', '0x1783930UL', '0x1783937UL', '0x1783929UL', '0x178392eUL', '0x17839d0UL', '0x17839d7UL', '0x17839c9UL', '0x17839ceUL', '0x17bc210UL', '0x17bc217UL', '0x17bc209UL', '0x17bc20eUL', '0x17bc2f0UL', '0x17bc2f7UL', '0x17bc2e9UL', '0x17bc2eeUL', '0x17bc130UL', '0x17bc137UL', '0x17bc129UL', '0x17bc12eUL', '0x17bc1d0UL', '0x17bc1d7UL', '0x17bc1c9UL', '0x17bc1ceUL', '0x17bde10UL', '0x17bde17UL', '0x17bde09UL', '0x17bde0eUL', '0x17bdef0UL', '0x17bdef7UL', '0x17bdee9UL', '0x17bdeeeUL', '0x17bdd30UL', '0x17bdd37UL', '0x17bdd29UL', '0x17bdd2eUL', '0x17bddd0UL', '0x17bddd7UL', '0x17bddc9UL', '0x17bddceUL', '0x17ba610UL', '0x17ba617UL', '0x17ba609UL', '0x17ba60eUL', '0x17ba6f0UL', '0x17ba6f7UL', '0x17ba6e9UL', '0x17ba6eeUL', '0x17ba530UL', '0x17ba537UL', '0x17ba529UL', '0x17ba52eUL', '0x17ba5d0UL', '0x17ba5d7UL', '0x17ba5c9UL', '0x17ba5ceUL', '0x17bba10UL', '0x17bba17UL', '0x17bba09UL', '0x17bba0eUL', '0x17bbaf0UL', '0x17bbaf7UL', '0x17bbae9UL', '0x17bbaeeUL', '0x17bb930UL', '0x17bb937UL', '0x17bb929UL', '0x17bb92eUL', '0x17bb9d0UL', '0x17bb9d7UL', '0x17bb9c9UL', '0x17bb9ceUL', '0x174c210UL', '0x174c217UL', '0x174c209UL', '0x174c20eUL', '0x174c2f0UL', '0x174c2f7UL', '0x174c2e9UL', '0x174c2eeUL', '0x174c130UL', '0x174c137UL', '0x174c129UL', '0x174c12eUL', '0x174c1d0UL', '0x174c1d7UL', '0x174c1c9UL', '0x174c1ceUL', '0x174de10UL', '0x174de17UL', '0x174de09UL', '0x174de0eUL', '0x174def0UL', '0x174def7UL', '0x174dee9UL', '0x174deeeUL', '0x174dd30UL', '0x174dd37UL', '0x174dd29UL', '0x174dd2eUL', '0x174ddd0UL', '0x174ddd7UL', '0x174ddc9UL', '0x174ddceUL', '0x174a610UL', '0x174a617UL', '0x174a609UL', '0x174a60eUL', '0x174a6f0UL', '0x174a6f7UL', '0x174a6e9UL', '0x174a6eeUL', '0x174a530UL', '0x174a537UL', '0x174a529UL', '0x174a52eUL', '0x174a5d0UL', '0x174a5d7UL', '0x174a5c9UL', '0x174a5ceUL', '0x174ba10UL', '0x174ba17UL', '0x174ba09UL', '0x174ba0eUL', '0x174baf0UL', '0x174baf7UL', '0x174bae9UL', '0x174baeeUL', '0x174b930UL', '0x174b937UL', '0x174b929UL', '0x174b92eUL', '0x174b9d0UL', '0x174b9d7UL', '0x174b9c9UL', '0x174b9ceUL', '0x1774210UL', '0x1774217UL', '0x1774209UL', '0x177420eUL', '0x17742f0UL', '0x17742f7UL', '0x17742e9UL', '0x17742eeUL', '0x1774130UL', '0x1774137UL', '0x1774129UL', '0x177412eUL', '0x17741d0UL', '0x17741d7UL', '0x17741c9UL', '0x17741ceUL', '0x1775e10UL', '0x1775e17UL', '0x1775e09UL', '0x1775e0eUL', '0x1775ef0UL', '0x1775ef7UL', '0x1775ee9UL', '0x1775eeeUL', '0x1775d30UL', '0x1775d37UL', '0x1775d29UL', '0x1775d2eUL', '0x1775dd0UL', '0x1775dd7UL', '0x1775dc9UL', '0x1775dceUL', '0x1772610UL', '0x1772617UL', '0x1772609UL', '0x177260eUL', '0x17726f0UL', '0x17726f7UL', '0x17726e9UL', '0x17726eeUL', '0x1772530UL', '0x1772537UL', '0x1772529UL', '0x177252eUL', '0x17725d0UL', '0x17725d7UL', '0x17725c9UL', '0x17725ceUL', '0x1773a10UL', '0x1773a17UL', '0x1773a09UL', '0x1773a0eUL', '0x1773af0UL', '0x1773af7UL', '0x1773ae9UL', '0x1773aeeUL', '0x1773930UL', '0x1773937UL', '0x1773929UL', '0x177392eUL', '0x17739d0UL', '0x17739d7UL', '0x17739c9UL', '0x17739ceUL', '0x984210UL', '0x984217UL', '0x984209UL', '0x98420eUL', '0x9842f0UL', '0x9842f7UL', '0x9842e9UL', '0x9842eeUL', '0x984130UL', '0x984137UL', '0x984129UL', '0x98412eUL', '0x9841d0UL', '0x9841d7UL', '0x9841c9UL', '0x9841ceUL', '0x985e10UL', '0x985e17UL', '0x985e09UL', '0x985e0eUL', '0x985ef0UL', '0x985ef7UL', '0x985ee9UL', '0x985eeeUL', '0x985d30UL', '0x985d37UL', '0x985d29UL', '0x985d2eUL', '0x985dd0UL', '0x985dd7UL', '0x985dc9UL', '0x985dceUL', '0x982610UL', '0x982617UL', '0x982609UL', '0x98260eUL', '0x9826f0UL', '0x9826f7UL', '0x9826e9UL', '0x9826eeUL', '0x982530UL', '0x982537UL', '0x982529UL', '0x98252eUL', '0x9825d0UL', '0x9825d7UL', '0x9825c9UL', '0x9825ceUL', '0x983a10UL', '0x983a17UL', '0x983a09UL', '0x983a0eUL', '0x983af0UL', '0x983af7UL', '0x983ae9UL', '0x983aeeUL', '0x983930UL', '0x983937UL', '0x983929UL', '0x98392eUL', '0x9839d0UL', '0x9839d7UL', '0x9839c9UL', '0x9839ceUL', '0x9bc210UL', '0x9bc217UL', '0x9bc209UL', '0x9bc20eUL', '0x9bc2f0UL', '0x9bc2f7UL', '0x9bc2e9UL', '0x9bc2eeUL', '0x9bc130UL', '0x9bc137UL', '0x9bc129UL', '0x9bc12eUL', '0x9bc1d0UL', '0x9bc1d7UL', '0x9bc1c9UL', '0x9bc1ceUL', '0x9bde10UL', '0x9bde17UL', '0x9bde09UL', '0x9bde0eUL', '0x9bdef0UL', '0x9bdef7UL', '0x9bdee9UL', '0x9bdeeeUL', '0x9bdd30UL', '0x9bdd37UL', '0x9bdd29UL', '0x9bdd2eUL', '0x9bddd0UL', '0x9bddd7UL', '0x9bddc9UL', '0x9bddceUL', '0x9ba610UL', '0x9ba617UL', '0x9ba609UL', '0x9ba60eUL', '0x9ba6f0UL', '0x9ba6f7UL', '0x9ba6e9UL', '0x9ba6eeUL', '0x9ba530UL', '0x9ba537UL', '0x9ba529UL', '0x9ba52eUL', '0x9ba5d0UL', '0x9ba5d7UL', '0x9ba5c9UL', '0x9ba5ceUL', '0x9bba10UL', '0x9bba17UL', '0x9bba09UL', '0x9bba0eUL', '0x9bbaf0UL', '0x9bbaf7UL', '0x9bbae9UL', '0x9bbaeeUL', '0x9bb930UL', '0x9bb937UL', '0x9bb929UL', '0x9bb92eUL', '0x9bb9d0UL', '0x9bb9d7UL', '0x9bb9c9UL', '0x9bb9ceUL', '0x94c210UL', '0x94c217UL', '0x94c209UL', '0x94c20eUL', '0x94c2f0UL', '0x94c2f7UL', '0x94c2e9UL', '0x94c2eeUL', '0x94c130UL', '0x94c137UL', '0x94c129UL', '0x94c12eUL', '0x94c1d0UL', '0x94c1d7UL', '0x94c1c9UL', '0x94c1ceUL', '0x94de10UL', '0x94de17UL', '0x94de09UL', '0x94de0eUL', '0x94def0UL', '0x94def7UL', '0x94dee9UL', '0x94deeeUL', '0x94dd30UL', '0x94dd37UL', '0x94dd29UL', '0x94dd2eUL', '0x94ddd0UL', '0x94ddd7UL', '0x94ddc9UL', '0x94ddceUL', '0x94a610UL', '0x94a617UL', '0x94a609UL', '0x94a60eUL', '0x94a6f0UL', '0x94a6f7UL', '0x94a6e9UL', '0x94a6eeUL', '0x94a530UL', '0x94a537UL', '0x94a529UL', '0x94a52eUL', '0x94a5d0UL', '0x94a5d7UL', '0x94a5c9UL', '0x94a5ceUL', '0x94ba10UL', '0x94ba17UL', '0x94ba09UL', '0x94ba0eUL', '0x94baf0UL', '0x94baf7UL', '0x94bae9UL', '0x94baeeUL', '0x94b930UL', '0x94b937UL', '0x94b929UL', '0x94b92eUL', '0x94b9d0UL', '0x94b9d7UL', '0x94b9c9UL', '0x94b9ceUL', '0x974210UL', '0x974217UL', '0x974209UL', '0x97420eUL', '0x9742f0UL', '0x9742f7UL', '0x9742e9UL', '0x9742eeUL', '0x974130UL', '0x974137UL', '0x974129UL', '0x97412eUL', '0x9741d0UL', '0x9741d7UL', '0x9741c9UL', '0x9741ceUL', '0x975e10UL', '0x975e17UL', '0x975e09UL', '0x975e0eUL', '0x975ef0UL', '0x975ef7UL', '0x975ee9UL', '0x975eeeUL', '0x975d30UL', '0x975d37UL', '0x975d29UL', '0x975d2eUL', '0x975dd0UL', '0x975dd7UL', '0x975dc9UL', '0x975dceUL', '0x972610UL', '0x972617UL', '0x972609UL', '0x97260eUL', '0x9726f0UL', '0x9726f7UL', '0x9726e9UL', '0x9726eeUL', '0x972530UL', '0x972537UL', '0x972529UL', '0x97252eUL', '0x9725d0UL', '0x9725d7UL', '0x9725c9UL', '0x9725ceUL', '0x973a10UL', '0x973a17UL', '0x973a09UL', '0x973a0eUL', '0x973af0UL', '0x973af7UL', '0x973ae9UL', '0x973aeeUL', '0x973930UL', '0x973937UL', '0x973929UL', '0x97392eUL', '0x9739d0UL', '0x9739d7UL', '0x9739c9UL', '0x9739ceUL', '0xe84210UL', '0xe84217UL', '0xe84209UL', '0xe8420eUL', '0xe842f0UL', '0xe842f7UL', '0xe842e9UL', '0xe842eeUL', '0xe84130UL', '0xe84137UL', '0xe84129UL', '0xe8412eUL', '0xe841d0UL', '0xe841d7UL', '0xe841c9UL', '0xe841ceUL', '0xe85e10UL', '0xe85e17UL', '0xe85e09UL', '0xe85e0eUL', '0xe85ef0UL', '0xe85ef7UL', '0xe85ee9UL', '0xe85eeeUL', '0xe85d30UL', '0xe85d37UL', '0xe85d29UL', '0xe85d2eUL', '0xe85dd0UL', '0xe85dd7UL', '0xe85dc9UL', '0xe85dceUL', '0xe82610UL', '0xe82617UL', '0xe82609UL', '0xe8260eUL', '0xe826f0UL', '0xe826f7UL', '0xe826e9UL', '0xe826eeUL', '0xe82530UL', '0xe82537UL', '0xe82529UL', '0xe8252eUL', '0xe825d0UL', '0xe825d7UL', '0xe825c9UL', '0xe825ceUL', '0xe83a10UL', '0xe83a17UL', '0xe83a09UL', '0xe83a0eUL', '0xe83af0UL', '0xe83af7UL', '0xe83ae9UL', '0xe83aeeUL', '0xe83930UL', '0xe83937UL', '0xe83929UL', '0xe8392eUL', '0xe839d0UL', '0xe839d7UL', '0xe839c9UL', '0xe839ceUL', '0xebc210UL', '0xebc217UL', '0xebc209UL', '0xebc20eUL', '0xebc2f0UL', '0xebc2f7UL', '0xebc2e9UL', '0xebc2eeUL', '0xebc130UL', '0xebc137UL', '0xebc129UL', '0xebc12eUL', '0xebc1d0UL', '0xebc1d7UL', '0xebc1c9UL', '0xebc1ceUL', '0xebde10UL', '0xebde17UL', '0xebde09UL', '0xebde0eUL', '0xebdef0UL', '0xebdef7UL', '0xebdee9UL', '0xebdeeeUL', '0xebdd30UL', '0xebdd37UL', '0xebdd29UL', '0xebdd2eUL', '0xebddd0UL', '0xebddd7UL', '0xebddc9UL', '0xebddceUL', '0xeba610UL', '0xeba617UL', '0xeba609UL', '0xeba60eUL', '0xeba6f0UL', '0xeba6f7UL', '0xeba6e9UL', '0xeba6eeUL', '0xeba530UL', '0xeba537UL', '0xeba529UL', '0xeba52eUL', '0xeba5d0UL', '0xeba5d7UL', '0xeba5c9UL', '0xeba5ceUL', '0xebba10UL', '0xebba17UL', '0xebba09UL', '0xebba0eUL', '0xebbaf0UL', '0xebbaf7UL', '0xebbae9UL', '0xebbaeeUL', '0xebb930UL', '0xebb937UL', '0xebb929UL', '0xebb92eUL', '0xebb9d0UL', '0xebb9d7UL', '0xebb9c9UL', '0xebb9ceUL', '0xe4c210UL', '0xe4c217UL', '0xe4c209UL', '0xe4c20eUL', '0xe4c2f0UL', '0xe4c2f7UL', '0xe4c2e9UL', '0xe4c2eeUL', '0xe4c130UL', '0xe4c137UL', '0xe4c129UL', '0xe4c12eUL', '0xe4c1d0UL', '0xe4c1d7UL', '0xe4c1c9UL', '0xe4c1ceUL', '0xe4de10UL', '0xe4de17UL', '0xe4de09UL', '0xe4de0eUL', '0xe4def0UL', '0xe4def7UL', '0xe4dee9UL', '0xe4deeeUL', '0xe4dd30UL', '0xe4dd37UL', '0xe4dd29UL', '0xe4dd2eUL', '0xe4ddd0UL', '0xe4ddd7UL', '0xe4ddc9UL', '0xe4ddceUL', '0xe4a610UL', '0xe4a617UL', '0xe4a609UL', '0xe4a60eUL', '0xe4a6f0UL', '0xe4a6f7UL', '0xe4a6e9UL', '0xe4a6eeUL', '0xe4a530UL', '0xe4a537UL', '0xe4a529UL', '0xe4a52eUL', '0xe4a5d0UL', '0xe4a5d7UL', '0xe4a5c9UL', '0xe4a5ceUL', '0xe4ba10UL', '0xe4ba17UL', '0xe4ba09UL', '0xe4ba0eUL', '0xe4baf0UL', '0xe4baf7UL', '0xe4bae9UL', '0xe4baeeUL', '0xe4b930UL', '0xe4b937UL', '0xe4b929UL', '0xe4b92eUL', '0xe4b9d0UL', '0xe4b9d7UL', '0xe4b9c9UL', '0xe4b9ceUL', '0xe74210UL', '0xe74217UL', '0xe74209UL', '0xe7420eUL', '0xe742f0UL', '0xe742f7UL', '0xe742e9UL', '0xe742eeUL', '0xe74130UL', '0xe74137UL', '0xe74129UL', '0xe7412eUL', '0xe741d0UL', '0xe741d7UL', '0xe741c9UL', '0xe741ceUL', '0xe75e10UL', '0xe75e17UL', '0xe75e09UL', '0xe75e0eUL', '0xe75ef0UL', '0xe75ef7UL', '0xe75ee9UL', '0xe75eeeUL', '0xe75d30UL', '0xe75d37UL', '0xe75d29UL', '0xe75d2eUL', '0xe75dd0UL', '0xe75dd7UL', '0xe75dc9UL', '0xe75dceUL', '0xe72610UL', '0xe72617UL', '0xe72609UL', '0xe7260eUL', '0xe726f0UL', '0xe726f7UL', '0xe726e9UL', '0xe726eeUL', '0xe72530UL', '0xe72537UL', '0xe72529UL', '0xe7252eUL', '0xe725d0UL', '0xe725d7UL', '0xe725c9UL', '0xe725ceUL', '0xe73a10UL', '0xe73a17UL', '0xe73a09UL', '0xe73a0eUL', '0xe73af0UL', '0xe73af7UL', '0xe73ae9UL', '0xe73aeeUL', '0xe73930UL', '0xe73937UL', '0xe73929UL', '0xe7392eUL', '0xe739d0UL', '0xe739d7UL', '0xe739c9UL']
  },
  ARUCO_MIP_36h12: {
    nBits: 36,
    tau: 12,
    codeList: ['0xd2b63a09dUL', '0x6001134e5UL', '0x1206fbe72UL', '0xff8ad6cb4UL', '0x85da9bc49UL', '0xb461afe9cUL', '0x6db51fe13UL', '0x5248c541fUL', '0x8f34503UL', '0x8ea462eceUL', '0xeac2be76dUL', '0x1af615c44UL', '0xb48a49f27UL', '0x2e4e1283bUL', '0x78b1f2fa8UL', '0x27d34f57eUL', '0x89222fff1UL', '0x4c1669406UL', '0xbf49b3511UL', '0xdc191cd5dUL', '0x11d7c3f85UL', '0x16a130e35UL', '0xe29f27effUL', '0x428d8ae0cUL', '0x90d548477UL', '0x2319cbc93UL', '0xc3b0c3dfcUL', '0x424bccc9UL', '0x2a081d630UL', '0x762743d96UL', '0xd0645bf19UL', '0xf38d7fd60UL', '0xc6cbf9a10UL', '0x3c1be7c65UL', '0x276f75e63UL', '0x4490a3f63UL', '0xda60acd52UL', '0x3cc68df59UL', '0xab46f9daeUL', '0x88d533d78UL', '0xb6d62ec21UL', '0xb3c02b646UL', '0x22e56d408UL', '0xac5f5770aUL', '0xaaa993f66UL', '0x4caa07c8dUL', '0x5c9b4f7b0UL', '0xaa9ef0e05UL', '0x705c5750UL', '0xac81f545eUL', '0x735b91e74UL', '0x8cc35cee4UL', '0xe44694d04UL', '0xb5e121de0UL', '0x261017d0fUL', '0xf1d439eb5UL', '0xa1a33ac96UL', '0x174c62c02UL', '0x1ee27f716UL', '0x8b1c5ece9UL', '0x6a05b0c6aUL', '0xd0568dfcUL', '0x192d25e5fUL', '0x1adbeccc8UL', '0xcfec87f00UL', '0xd0b9dde7aUL', '0x88dcef81eUL', '0x445681cb9UL', '0xdbb2ffc83UL', '0xa48d96df1UL', '0xb72cc2e7dUL', '0xc295b53fUL', '0xf49832704UL', '0x9968edc29UL', '0x9e4e1af85UL', '0x8683e2d1bUL', '0x810b45c04UL', '0x6ac44bfe2UL', '0x645346615UL', '0x3990bd598UL', '0x1c9ed0f6aUL', '0xc26729d65UL', '0x83993f795UL', '0x3ac05ac5dUL', '0x357adff3bUL', '0xd5c05565UL', '0x2f547ef44UL', '0x86c115041UL', '0x640fd9e5fUL', '0xce08bbcf7UL', '0x109bb343eUL', '0xc21435c92UL', '0x35b4dfce4UL', '0x459752cf2UL', '0xec915b82cUL', '0x51881eed0UL', '0x2dda7dc97UL', '0x2e0142144UL', '0x42e890f99UL', '0x9a8856527UL', '0x8e80d9d80UL', '0x891cbcf34UL', '0x25dd82410UL', '0x239551d34UL', '0x8fe8f0c70UL', '0x94106a970UL', '0x82609b40cUL', '0xfc9caf36UL', '0x688181d11UL', '0x718613c08UL', '0xf1ab7629UL', '0xa357bfc18UL', '0x4c03b7a46UL', '0x204dedce6UL', '0xad6300d37UL', '0x84cc4cd09UL', '0x42160e5c4UL', '0x87d2adfa8UL', '0x7850e7749UL', '0x4e750fc7cUL', '0xbf2e5dfdaUL', '0xd88324da5UL', '0x234b52f80UL', '0x378204514UL', '0xabdf2ad53UL', '0x365e78ef9UL', '0x49caa6ca2UL', '0x3c39ddf3UL', '0xc68c5385dUL', '0x5bfcbbf67UL', '0x623241e21UL', '0xabc90d5ccUL', '0x388c6fe85UL', '0xda0e2d62dUL', '0x10855dfe9UL', '0x4d46efd6bUL', '0x76ea12d61UL', '0x9db377d3dUL', '0xeed0efa71UL', '0xe6ec3ae2fUL', '0x441faee83UL', '0xba19c8ff5UL', '0x313035eabUL', '0x6ce8f7625UL', '0x880dab58dUL', '0x8d3409e0dUL', '0x2be92ee21UL', '0xd60302c6cUL', '0x469ffc724UL', '0x87eebeed3UL', '0x42587ef7aUL', '0x7a8cc4e52UL', '0x76a437650UL', '0x999e41ef4UL', '0x7d0969e42UL', '0xc02baf46bUL', '0x9259f3e47UL', '0x2116a1dc0UL', '0x9f2de4d84UL', '0xeffac29UL', '0x7b371ff8cUL', '0x668339da9UL', '0xd010aee3fUL', '0x1cd00b4c0UL', '0x95070fc3bUL', '0xf84c9a770UL', '0x38f863d76UL', '0x3646ff045UL', '0xce1b96412UL', '0x7a5d45da8UL', '0x14e00ef6cUL', '0x5e95abfd8UL', '0xb2e9cb729UL', '0x36c47dd7UL', '0xb8ee97c6bUL', '0xe9e8f657UL', '0xd4ad2ef1aUL', '0x8811c7f32UL', '0x47bde7c31UL', '0x3adadfb64UL', '0x6e5b28574UL', '0x33e67cd91UL', '0x2ab9fdd2dUL', '0x8afa67f2bUL', '0xe6a28fc5eUL', '0x72049cdbdUL', '0xae65dac12UL', '0x1251a4526UL', '0x1089ab841UL', '0xe2f096ee0UL', '0xb0caee573UL', '0xfd6677e86UL', '0x444b3f518UL', '0xbe8b3a56aUL', '0x680a75cfcUL', '0xac02baea8UL', '0x97d815e1cUL', '0x1d4386e08UL', '0x1a14f5b0eUL', '0xe658a8d81UL', '0xa3868efa7UL', '0x3668a9673UL', '0xe8fc53d85UL', '0x2e2b7edd5UL', '0x8b2470f13UL', '0xf69795f32UL', '0x4589ffc8eUL', '0x2e2080c9cUL', '0x64265f7dUL', '0x3d714dd10UL', '0x1692c6ef1UL', '0x3e67f2f49UL', '0x5041dad63UL', '0x1a1503415UL', '0x64c18c742UL', '0xa72eec35UL', '0x1f0f9dc60UL', '0xa9559bc67UL', '0xf32911d0dUL', '0x21c0d4ffcUL', '0xe01cef5b0UL', '0x4e23a3520UL', '0xaa4f04e49UL', '0xe1c4fcc43UL', '0x208e8f6e8UL', '0x8486774a5UL', '0x9e98c7558UL', '0x2c59fb7dcUL', '0x9446a4613UL', '0x8292dcc2eUL', '0x4d61631UL', '0xd05527809UL', '0xa0163852dUL', '0x8f657f639UL', '0xcca6c3e37UL', '0xcb136bc7aUL', '0xfc5a83e53UL', '0x9aa44fc30UL', '0xbdec1bd3cUL', '0xe020b9f7cUL', '0x4b8f35fb0UL', '0xb8165f637UL', '0x33dc88d69UL', '0x10a2f7e4dUL', '0xc8cb5ff53UL', '0xde259ff6bUL', '0x46d070dd4UL', '0x32d3b9741UL', '0x7075f1c04UL', '0x4d58dbea0UL']
  }
};

AR.Dictionary = function (dicName) {
  this.codes = {};
  this.codeList = [];
  this.tau = 0;
  this._initialize(dicName);
};

AR.Dictionary.prototype._initialize = function (dicName) {
  this.codes = {};
  this.codeList = [];
  this.tau = 0;
  this.nBits = 0;
  this.markSize = 0;
  var dictionary = AR.DICTIONARIES[dicName];
  if (!dictionary)
    throw 'The dictionary "' + dicName + '" is not recognized.';
  this.tau = dictionary.tau;
  this.nBits = dictionary.nBits;
  this.markSize = Math.sqrt(dictionary.nBits) + 2;
  for (var i = 0; i < dictionary.codeList.length; i++) {
    var code = this._hex2bin(dictionary.codeList[i], dictionary.nBits);
    this.codeList.push(code);
    this.codes[code] = {
      id: i
    };
  }
};

AR.Dictionary.prototype.find = function (bits) {
  var val = '',
    i, j;
  for (i = 0; i < bits.length; i++) {
    var bitRow = bits[i];
    for (j = 0; j < bitRow.length; j++) {
      val += bitRow[j];
    }
  }
  var minFound = this.codes[val];
  if (minFound)
    return {
      id: minFound.id,
      distance: 0
    };

  for (i = 0; i < this.codeList.length; i++) {
    var code = this.codeList[i];
    var distance = this._hammingDistance(val, code);
    if (this._hammingDistance(val, code) < this.tau) {
      if (!minFound || minFound.distance > distance) {
        minFound = {
          id: this.codes[code].id,
          distance: distance
        };
      }
    }
  }
  return minFound;
};

AR.Dictionary.prototype._hex2bin = function (hex, nBits) {
  return parseInt(hex, 16).toString(2).padStart(nBits, '0');
};

AR.Dictionary.prototype._hammingDistance = function (str1, str2) {
  if (str1.length != str2.length)
    throw 'Hamming distance calculation require inputs of the same length';
  var distance = 0,
    i;
  for (i = 0; i < str1.length; i++)
    if (str1[i] !== str2[i])
      distance += 1;
  return distance;
};

AR.Marker = function (id, corners, hammingDistance) {
  this.id = id;
  this.corners = corners;
  this.hammingDistance = hammingDistance;
};

AR.Detector = function (config) {
  config = config || {};
  this.grey = new CV.Image();
  this.thres = new CV.Image();
  this.homography = new CV.Image();
  this.binary = [];
  this.contours = [];
  this.polys = [];
  this.candidates = [];
  config.dictionaryName = config.dictionaryName || 'ARUCO_MIP_36h12';
  this.dictionary = new AR.Dictionary(config.dictionaryName);
  this.dictionary.tau = config.maxHammingDistance != null ? config.maxHammingDistance : this.dictionary.tau;
};

AR.Detector.prototype.detectImage = function (width, height, data) {
  return this.detect({
    width: width,
    height: height,
    data: data
  });
};

AR.Detector.prototype.detectStreamInit = function (width, height, callback) {
  this.streamConfig = {};
  this.streamConfig.width = width;
  this.streamConfig.height = height;
  this.streamConfig.imageSize = width * height * 4; //provided image must be a sequence of rgba bytes (4 bytes represent a pixel)
  this.streamConfig.index = 0;
  this.streamConfig.imageData = new Uint8ClampedArray(this.streamConfig.imageSize);
  this.streamConfig.callback = callback || function (image, markerList) {};
};

//accept data chunks of different sizes
AR.Detector.prototype.detectStream = function (data) {
  for (var i = 0; i < data.length; i++) {
    this.streamConfig.imageData[this.streamConfig.index] = data[i];
    this.streamConfig.index = (this.streamConfig.index + 1) % this.streamConfig.imageSize;
    if (this.streamConfig.index == 0) {
      var image = {
        width: this.streamConfig.width,
        height: this.streamConfig.height,
        data: this.streamConfig.imageData
      };
      var markerList = this.detect(image);
      this.streamConfig.callback(image, markerList);
    }
  }
};

AR.Detector.prototype.detect = function (image) {
  CV.grayscale(image, this.grey);
  CV.adaptiveThreshold(this.grey, this.thres, 2, 7);

  this.contours = CV.findContours(this.thres, this.binary);
  //Scale Fix: https://stackoverflow.com/questions/35936397/marker-detection-on-paper-sheet-using-javascript
  //this.candidates = this.findCandidates(this.contours, image.width * 0.20, 0.05, 10);
  this.candidates = this.findCandidates(this.contours, image.width * 0.01, 0.05, 10);
  this.candidates = this.clockwiseCorners(this.candidates);
  this.candidates = this.notTooNear(this.candidates, 10);

  return this.findMarkers(this.grey, this.candidates, 49);
};

AR.Detector.prototype.findCandidates = function (contours, minSize, epsilon, minLength) {
  var candidates = [],
    len = contours.length,
    contour, poly, i;

  this.polys = [];

  for (i = 0; i < len; ++i) {
    contour = contours[i];

    if (contour.length >= minSize) {
      poly = CV.approxPolyDP(contour, contour.length * epsilon);

      this.polys.push(poly);

      if ((4 === poly.length) && (CV.isContourConvex(poly))) {

        if (CV.minEdgeLength(poly) >= minLength) {
          candidates.push(poly);
        }
      }
    }
  }

  return candidates;
};

AR.Detector.prototype.clockwiseCorners = function (candidates) {
  var len = candidates.length,
    dx1, dx2, dy1, dy2, swap, i;

  for (i = 0; i < len; ++i) {
    dx1 = candidates[i][1].x - candidates[i][0].x;
    dy1 = candidates[i][1].y - candidates[i][0].y;
    dx2 = candidates[i][2].x - candidates[i][0].x;
    dy2 = candidates[i][2].y - candidates[i][0].y;

    if ((dx1 * dy2 - dy1 * dx2) < 0) {
      swap = candidates[i][1];
      candidates[i][1] = candidates[i][3];
      candidates[i][3] = swap;
    }
  }

  return candidates;
};

AR.Detector.prototype.notTooNear = function (candidates, minDist) {
  var notTooNear = [],
    len = candidates.length,
    dist, dx, dy, i, j, k;

  for (i = 0; i < len; ++i) {

    for (j = i + 1; j < len; ++j) {
      dist = 0;

      for (k = 0; k < 4; ++k) {
        dx = candidates[i][k].x - candidates[j][k].x;
        dy = candidates[i][k].y - candidates[j][k].y;

        dist += dx * dx + dy * dy;
      }

      if ((dist / 4) < (minDist * minDist)) {

        if (CV.perimeter(candidates[i]) < CV.perimeter(candidates[j])) {
          candidates[i].tooNear = true;
        } else {
          candidates[j].tooNear = true;
        }
      }
    }
  }

  for (i = 0; i < len; ++i) {
    if (!candidates[i].tooNear) {
      notTooNear.push(candidates[i]);
    }
  }

  return notTooNear;
};

AR.Detector.prototype.findMarkers = function (imageSrc, candidates, warpSize) {
  var markers = [],
    len = candidates.length,
    candidate, marker, i;

  for (i = 0; i < len; ++i) {
    candidate = candidates[i];

    CV.warp(imageSrc, this.homography, candidate, warpSize);

    CV.threshold(this.homography, this.homography, CV.otsu(this.homography));

    marker = this.getMarker(this.homography, candidate);
    if (marker) {
      markers.push(marker);
    }
  }

  return markers;
};

AR.Detector.prototype.getMarker = function (imageSrc, candidate) {
  var markSize = this.dictionary.markSize;
  var width = (imageSrc.width / markSize) >>> 0,
    minZero = (width * width) >> 1,
    bits = [],
    rotations = [],
    square, inc, i, j;

  for (i = 0; i < markSize; ++i) {
    inc = (0 === i || (markSize - 1) === i) ? 1 : (markSize - 1);

    for (j = 0; j < markSize; j += inc) {
      square = {
        x: j * width,
        y: i * width,
        width: width,
        height: width
      };
      if (CV.countNonZero(imageSrc, square) > minZero) {
        return null;
      }
    }
  }

  for (i = 0; i < markSize - 2; ++i) {
    bits[i] = [];

    for (j = 0; j < markSize - 2; ++j) {
      square = {
        x: (j + 1) * width,
        y: (i + 1) * width,
        width: width,
        height: width
      };

      bits[i][j] = CV.countNonZero(imageSrc, square) > minZero ? 1 : 0;
    }
  }

  rotations[0] = bits;

  var foundMin = null;
  var rot = 0;
  for (i = 0; i < 4; i++) {
    var found = this.dictionary.find(rotations[i]);
    if (found && (foundMin === null || found.distance < foundMin.distance)) {
      foundMin = found;
      rot = i;
      if (foundMin.distance === 0)
        break;
    }
    rotations[i + 1] = this.rotate(rotations[i]);
  }

  if (foundMin)
    return new AR.Marker(foundMin.id, this.rotate2(candidate, rot), foundMin.distance);

  return null;
};

AR.Detector.prototype.rotate = function (src) {
  var dst = [],
    len = src.length,
    i, j;

  for (i = 0; i < len; ++i) {
    dst[i] = [];
    for (j = 0; j < src[i].length; ++j) {
      dst[i][j] = src[src[i].length - j - 1][i];
    }
  }

  return dst;
};

AR.Detector.prototype.rotate2 = function (src, rotation) {
  var dst = [],
    len = src.length,
    i;

  for (i = 0; i < len; ++i) {
    dst[i] = src[(rotation + i) % len];
  }

  return dst;
};
