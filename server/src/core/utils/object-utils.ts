export function removerPropriedade(
  objeto: Record<string, unknown>,
  nomeDaPropriedade: string
): void {
  // Verificar se a propriedade existe no objeto
  if (Object.prototype.hasOwnProperty.call(objeto, nomeDaPropriedade)) {
    // Usar o operador delete para remover a propriedade do objeto
    delete objeto[nomeDaPropriedade];
    // Retornar true para indicar que a propriedade foi removida com sucesso
    return;
  } else {
    // Se a propriedade não existe no objeto, retornar false
    return;
  }
}
