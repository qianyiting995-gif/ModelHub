export type ModelType = 'AGENT' | 'CHAT_ASSISTANT' | 'TEXT_GEN' | 'CHATFLOW' | 'WORKFLOW';

export interface Model {
  id: string;
  name: string;
  type: ModelType;
  description?: string;
  icon?: string;
  tags?: string[];
  isCreatedByMe?: boolean;
  lastEditedBy?: string;
  lastEditedTime?: string;
}
