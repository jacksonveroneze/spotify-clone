import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IBotao {
    id: string;
    descricao: string;
    icone: IconDefinition;
    selecionado: boolean;
    actionUrl: string;
}
