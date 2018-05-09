Expression
  = m:(Elemento   Separador  )+ {return m.map(e=>e[0])}

Elemento = (Marcador / Subrayado) 

Marcador = tit:Titulo _ "- Tu marcador " _ pa:Pagina _ po:Posicion _ Fecha {
  return {"obra": tit, "pos":po, "pag":pa, "tipo":"MARCADOR"}
  }
Subrayado = tit:Titulo _ "- Tu subrayado " _ pa:Pagina _ po:Posicion _ Fecha _ contenido:MenosSep {
  return {"obra": tit, "pos":po, "pag":pa, "tipo":"SUBRAYADO", "contenido":contenido}
  }

Titulo = tit:Palabras _ "(" autor:Palabras ")" {return {"titulo":tit, "autor":autor}}
Pagina = "en la página" _ i:Integer {return i}
Posicion = "posición " _ i:Integer ("-" Integer)?  {return i}
Fecha = "Añadido el " Palabra _ "," _ Integer _ Palabra [^\n]+ _

Palabra = p:[a-zA-Záíóúéñ﻿]+ {return p.join("")}
// Palabras = p:(_ (Palabra/[«»,.;:"'…]) _)+ {return p.join("")}
Palabras = p:(_ (Palabra/[1234567890.]) _)+ {return p.join("")}


MenosSep = p:([^==========])*{return p.join("")}
Separador = "==========" _
SepVer = "|"

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
= [ \t\n\r|﻿]*