import { PreCallAction, PostCallAction, Assistant, ToolFunction } from '../types/vapi.types';
import * as petShopPreCallActions from '../clients/pet-shop/pre-call.actions';
import * as petShopPostCallActions from '../clients/pet-shop/post-call.actions';
import * as petShopTools from '../clients/pet-shop/tools';

export interface ClientConfig {
  clientId: string;
  preCallActions: PreCallAction[];
  postCallActions: PostCallAction[];
  assistant: Assistant;
  tools: ToolFunction[];
}
// try to not hardcode this
export const ClientsConfig: Record<string, ClientConfig> = {
  petShop: {
    clientId: 'pet-shop-id',
    preCallActions: petShopPreCallActions.actions,
    postCallActions: petShopPostCallActions.actions,
    assistant: {
      name: 'PetShopAssistant',
      language: 'en',
      firstMessage: 'Welcome to Pet Shop! How can I assist you?',
      endCallMessage: 'Thank you for calling Pet Shop!',
    },
    tools: petShopTools.tools,
  },
};
