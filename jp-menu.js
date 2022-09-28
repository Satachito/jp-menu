class
JPMenu extends HTMLElement {
	constructor( text, data ) {
		super()
		this.classList.add( 'jp-menu-element' )
		text && this.appendChild( document.createTextNode( text ) )
		data && this.Fill( data )
		this.nodeCallback = _ => this.firstChild.textContent = _
		this.leafCallback = _ => this.firstChild.textContent = _
	}
	Fill( data, parent = this, path = [] ) {

		const
		child = parent.appendChild( document.createElement( 'div' ) )
		child.classList.add( 'jp-menu-child' )
		data.every( _ => !Array.isArray( _ ) ) && child.classList.add( 'jp-menu-scrollable' )
		data.forEach(
			( _, i ) => {
				const newPath = path.concat( [ i ] )
				const $ = child.appendChild( document.createElement( 'div' ) )
				$.classList.add( 'jp-menu-element' )
				if ( Array.isArray( _ ) ) {
					$.textContent = _[ 0 ]
					$.onclick = ev => {
						ev.stopPropagation()
						this.nodeCallback( _[ 0 ], newPath )
					}
					this.Fill( _[ 1 ], $, newPath )
				} else {
					$.textContent = _
					$.onclick = ev => {
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
			this.Fill( JSON.parse( n ) )
			break
		}
	}
}
customElements.define( 'jp-menu', JPMenu )

