class
JPMenu extends HTMLElement {
	constructor( text, data ) {
		super()
		text && this.appendChild( document.createTextNode( text ) )
		this.div = this.appendChild( document.createElement( 'div' ) )
		this.div.classList.add( 'jp-menu-child' )
		data && this.FillDiv( this.div, data )
		this.nodeCallback = _ => this.firstChild.textContent = _
		this.leafCallback = _ => this.firstChild.textContent = _
	}
	FillDiv( div, data, path = [] ) {
		data.forEach(
			( _, i ) => {
				const newPath = path.concat( [ i ] )
				const element = div.appendChild( document.createElement( 'div' ) )
				element.classList.add( 'jp-menu-element' )
				if ( Array.isArray( _ ) ) {
					element.textContent = _[ 0 ]
					element.onclick = ev => {
						ev.stopPropagation()
						this.nodeCallback( _[ 0 ], newPath )
					}
					element.div = element.appendChild( document.createElement( 'div' ) )
					element.div.classList.add( 'jp-menu-child' )
					this.FillDiv( element.div, _[ 1 ], newPath )
				} else {
					element.textContent = _
					element.onclick = ev => {
						ev.stopPropagation()
						this.leafCallback( _, newPath )
					}
				}
			}
		)
	}
	static get
	observedAttributes() { return [ 'json' ] }
	attributeChangedCallback( name, o, n ) {
		switch ( name ) {
		case 'json':
			this.FillDiv( this.div, JSON.parse( n ) )
			break
		}
	}
}
customElements.define( 'jp-menu', JPMenu )

