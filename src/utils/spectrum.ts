export interface ReactSpectrumComponent {
  UNSAFE_getDOMNode(): HTMLDivElement
}

export function extractDOMNode(component: ReactSpectrumComponent | null) {
  return component?.UNSAFE_getDOMNode()
}
