# Usage

## Sample

https://satachito.github.io/jp-menu/
https://recrateg.web.app/

## Read `CSS`

in `<head>`

```
<link rel="stylesheet" href=jp-menu-simple.css>
```

## Read `JS`

at the bottom of the `<body>`, before using it.

```
<script src=jp-menu.js></script>
```

## Menu Data Strucure

A menu is an array of menu element.

In menu, if a menu element is a type of Array, it has child menu, i.e. it is `node` element, otherwise it is `leaf` element.

#### Sample

* `[ 'A', 'B', 'C' ]`

This menu has three `leaf` elements, no `node` element.

* `[ [ 'A' [ 'AA', 'AB' ] ], 'B' ]`

This menu has one 'node' element `'A'` which has sub menu with two `leaf` elements `'AA'` and `'AB'`.

Also this menu has one `leaf` element `'B'`.


## Static

Supply menu data to `'json'` attribute as `JSON` string.

```index.html

<jp-menu
	json='[
		[	"Sun"
		,	[	"Mercury"
			,	[	"Venus"
				,	[ "2002 VE68" ]
				]
			,	[	"Earth"
				,	[ "Moon" ]
				]
			,	[	"Mars"
				,	[	"Phobos"
					,	"Deimos"
					]
				]
			,	[	"Jupiter"
				,	[	"Io"
					,	"Europa"
					,	"Ganymede"
					,	"Callisto"
					]
				]
			]
		]
	,	"Sirius"
	,	"Canopus"
	,	"α Centauri"
	,	"Arcturus"
	]'
>Initial TEXT</jp-menu><br>
```

## Dynamic

Supply menu data to constructor.

```
const data = [
	[	"Sun"
	,	[	"Mercury"
		,	[	"Venus"
			,	[ "2002 VE68" ]
			]
		,	[	"Earth"
			,	[ "Moon" ]
			]
		,	[	"Mars"
			,	[	"Phobos"
				,	"Deimos"
				]
			]
		,	[	"Jupiter"
			,	[	"Io"
				,	"Europa"
				,	"Ganymede"
				,	"Callisto"
				]
			]
		]
	]
,	"Sirius"
,	"Canopus"
,	"α Centauri"
,	"Arcturus"
]

const
menu2 = document.body.appendChild( new JPMenu( 'Menu2', data ) )
menu2.id = 'Menu2'
menu2.nodeCallback = menu2.leafCallback = ( text, path ) => menu2.firstChild.textContent = path + ':' + text

```

## Callbacks

JPMenu has two callbacks:

* leafCallback
* nodeCallback

which take two arguments:

* text - Selected Text.
* path - The path to descned data hierarchy.

Those defaults are setting selected menu to show up.

## Setting text

JPMenu's first child is text node. 

Set text content of this text node shows given string.
