import { ApplyLabelServicePostInTypeRef } from "./TypeRefs.js"
import { UserAreaGroupPostDataTypeRef } from "./TypeRefs.js"
import { CreateGroupPostReturnTypeRef } from "./TypeRefs.js"
import { CalendarDeleteDataTypeRef } from "./TypeRefs.js"
import { ChangePrimaryAddressServicePutInTypeRef } from "./TypeRefs.js"
import { UserAreaGroupDeleteDataTypeRef } from "./TypeRefs.js"
import { CustomerAccountCreateDataTypeRef } from "./TypeRefs.js"
import { DraftCreateDataTypeRef } from "./TypeRefs.js"
import { DraftCreateReturnTypeRef } from "./TypeRefs.js"
import { DraftUpdateDataTypeRef } from "./TypeRefs.js"
import { DraftUpdateReturnTypeRef } from "./TypeRefs.js"
import { EncryptTutanotaPropertiesDataTypeRef } from "./TypeRefs.js"
import { EntropyDataTypeRef } from "./TypeRefs.js"
import { ExternalUserDataTypeRef } from "./TypeRefs.js"
import { GroupInvitationPostDataTypeRef } from "./TypeRefs.js"
import { GroupInvitationPostReturnTypeRef } from "./TypeRefs.js"
import { GroupInvitationPutDataTypeRef } from "./TypeRefs.js"
import { GroupInvitationDeleteDataTypeRef } from "./TypeRefs.js"
import { ImportMailGetInTypeRef } from "./TypeRefs.js"
import { ImportMailGetOutTypeRef } from "./TypeRefs.js"
import { ImportMailPostInTypeRef } from "./TypeRefs.js"
import { ImportMailPostOutTypeRef } from "./TypeRefs.js"
import { ListUnsubscribeDataTypeRef } from "./TypeRefs.js"
import { MailExportTokenServicePostOutTypeRef } from "./TypeRefs.js"
import { CreateMailFolderDataTypeRef } from "./TypeRefs.js"
import { CreateMailFolderReturnTypeRef } from "./TypeRefs.js"
import { UpdateMailFolderDataTypeRef } from "./TypeRefs.js"
import { DeleteMailFolderDataTypeRef } from "./TypeRefs.js"
import { CreateMailGroupDataTypeRef } from "./TypeRefs.js"
import { MailGroupPostOutTypeRef } from "./TypeRefs.js"
import { DeleteGroupDataTypeRef } from "./TypeRefs.js"
import { DeleteMailDataTypeRef } from "./TypeRefs.js"
import { ManageLabelServicePostInTypeRef } from "./TypeRefs.js"
import { ManageLabelServiceDeleteInTypeRef } from "./TypeRefs.js"
import { MoveMailDataTypeRef } from "./TypeRefs.js"
import { NewsOutTypeRef } from "./TypeRefs.js"
import { NewsInTypeRef } from "./TypeRefs.js"
import { ReceiveInfoServiceDataTypeRef } from "./TypeRefs.js"
import { ReceiveInfoServicePostOutTypeRef } from "./TypeRefs.js"
import { ReportMailPostDataTypeRef } from "./TypeRefs.js"
import { ResolveConversationsServiceGetInTypeRef } from "./TypeRefs.js"
import { ResolveConversationsServiceGetOutTypeRef } from "./TypeRefs.js"
import { SendDraftDataTypeRef } from "./TypeRefs.js"
import { SendDraftReturnTypeRef } from "./TypeRefs.js"
import { SimpleMoveMailPostInTypeRef } from "./TypeRefs.js"
import { TranslationGetInTypeRef } from "./TypeRefs.js"
import { TranslationGetOutTypeRef } from "./TypeRefs.js"
import { UnreadMailStatePostInTypeRef } from "./TypeRefs.js"
import { UserAccountCreateDataTypeRef } from "./TypeRefs.js"
import { UserAccountPostOutTypeRef } from "./TypeRefs.js"

export const ApplyLabelService = Object.freeze({
	app: "tutanota",
	name: "ApplyLabelService",
	get: null,
	post: { data: ApplyLabelServicePostInTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const CalendarService = Object.freeze({
	app: "tutanota",
	name: "CalendarService",
	get: null,
	post: { data: UserAreaGroupPostDataTypeRef, return: CreateGroupPostReturnTypeRef },
	put: null,
	delete: { data: CalendarDeleteDataTypeRef, return: null },
} as const)

export const ChangePrimaryAddressService = Object.freeze({
	app: "tutanota",
	name: "ChangePrimaryAddressService",
	get: null,
	post: null,
	put: { data: ChangePrimaryAddressServicePutInTypeRef, return: null },
	delete: null,
} as const)

export const ContactListGroupService = Object.freeze({
	app: "tutanota",
	name: "ContactListGroupService",
	get: null,
	post: { data: UserAreaGroupPostDataTypeRef, return: CreateGroupPostReturnTypeRef },
	put: null,
	delete: { data: UserAreaGroupDeleteDataTypeRef, return: null },
} as const)

export const CustomerAccountService = Object.freeze({
	app: "tutanota",
	name: "CustomerAccountService",
	get: null,
	post: { data: CustomerAccountCreateDataTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const DraftService = Object.freeze({
	app: "tutanota",
	name: "DraftService",
	get: null,
	post: { data: DraftCreateDataTypeRef, return: DraftCreateReturnTypeRef },
	put: { data: DraftUpdateDataTypeRef, return: DraftUpdateReturnTypeRef },
	delete: null,
} as const)

export const EncryptTutanotaPropertiesService = Object.freeze({
	app: "tutanota",
	name: "EncryptTutanotaPropertiesService",
	get: null,
	post: { data: EncryptTutanotaPropertiesDataTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const EntropyService = Object.freeze({
	app: "tutanota",
	name: "EntropyService",
	get: null,
	post: null,
	put: { data: EntropyDataTypeRef, return: null },
	delete: null,
} as const)

export const ExternalUserService = Object.freeze({
	app: "tutanota",
	name: "ExternalUserService",
	get: null,
	post: { data: ExternalUserDataTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const GroupInvitationService = Object.freeze({
	app: "tutanota",
	name: "GroupInvitationService",
	get: null,
	post: { data: GroupInvitationPostDataTypeRef, return: GroupInvitationPostReturnTypeRef },
	put: { data: GroupInvitationPutDataTypeRef, return: null },
	delete: { data: GroupInvitationDeleteDataTypeRef, return: null },
} as const)

export const ImportMailService = Object.freeze({
	app: "tutanota",
	name: "ImportMailService",
	get: { data: ImportMailGetInTypeRef, return: ImportMailGetOutTypeRef },
	post: { data: ImportMailPostInTypeRef, return: ImportMailPostOutTypeRef },
	put: null,
	delete: null,
} as const)

export const ListUnsubscribeService = Object.freeze({
	app: "tutanota",
	name: "ListUnsubscribeService",
	get: null,
	post: { data: ListUnsubscribeDataTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const MailExportTokenService = Object.freeze({
	app: "tutanota",
	name: "MailExportTokenService",
	get: null,
	post: { data: null, return: MailExportTokenServicePostOutTypeRef },
	put: null,
	delete: null,
} as const)

export const MailFolderService = Object.freeze({
	app: "tutanota",
	name: "MailFolderService",
	get: null,
	post: { data: CreateMailFolderDataTypeRef, return: CreateMailFolderReturnTypeRef },
	put: { data: UpdateMailFolderDataTypeRef, return: null },
	delete: { data: DeleteMailFolderDataTypeRef, return: null },
} as const)

export const MailGroupService = Object.freeze({
	app: "tutanota",
	name: "MailGroupService",
	get: null,
	post: { data: CreateMailGroupDataTypeRef, return: MailGroupPostOutTypeRef },
	put: null,
	delete: { data: DeleteGroupDataTypeRef, return: null },
} as const)

export const MailService = Object.freeze({
	app: "tutanota",
	name: "MailService",
	get: null,
	post: null,
	put: null,
	delete: { data: DeleteMailDataTypeRef, return: null },
} as const)

export const ManageLabelService = Object.freeze({
	app: "tutanota",
	name: "ManageLabelService",
	get: null,
	post: { data: ManageLabelServicePostInTypeRef, return: null },
	put: null,
	delete: { data: ManageLabelServiceDeleteInTypeRef, return: null },
} as const)

export const MoveMailService = Object.freeze({
	app: "tutanota",
	name: "MoveMailService",
	get: null,
	post: { data: MoveMailDataTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const NewsService = Object.freeze({
	app: "tutanota",
	name: "NewsService",
	get: { data: null, return: NewsOutTypeRef },
	post: { data: NewsInTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const ReceiveInfoService = Object.freeze({
	app: "tutanota",
	name: "ReceiveInfoService",
	get: null,
	post: { data: ReceiveInfoServiceDataTypeRef, return: ReceiveInfoServicePostOutTypeRef },
	put: null,
	delete: null,
} as const)

export const ReportMailService = Object.freeze({
	app: "tutanota",
	name: "ReportMailService",
	get: null,
	post: { data: ReportMailPostDataTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const ResolveConversationsService = Object.freeze({
	app: "tutanota",
	name: "ResolveConversationsService",
	get: { data: ResolveConversationsServiceGetInTypeRef, return: ResolveConversationsServiceGetOutTypeRef },
	post: null,
	put: null,
	delete: null,
} as const)

export const SendDraftService = Object.freeze({
	app: "tutanota",
	name: "SendDraftService",
	get: null,
	post: { data: SendDraftDataTypeRef, return: SendDraftReturnTypeRef },
	put: null,
	delete: null,
} as const)

export const SimpleMoveMailService = Object.freeze({
	app: "tutanota",
	name: "SimpleMoveMailService",
	get: null,
	post: { data: SimpleMoveMailPostInTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const TemplateGroupService = Object.freeze({
	app: "tutanota",
	name: "TemplateGroupService",
	get: null,
	post: { data: UserAreaGroupPostDataTypeRef, return: CreateGroupPostReturnTypeRef },
	put: null,
	delete: { data: UserAreaGroupDeleteDataTypeRef, return: null },
} as const)

export const TranslationService = Object.freeze({
	app: "tutanota",
	name: "TranslationService",
	get: { data: TranslationGetInTypeRef, return: TranslationGetOutTypeRef },
	post: null,
	put: null,
	delete: null,
} as const)

export const UnreadMailStateService = Object.freeze({
	app: "tutanota",
	name: "UnreadMailStateService",
	get: null,
	post: { data: UnreadMailStatePostInTypeRef, return: null },
	put: null,
	delete: null,
} as const)

export const UserAccountService = Object.freeze({
	app: "tutanota",
	name: "UserAccountService",
	get: null,
	post: { data: UserAccountCreateDataTypeRef, return: UserAccountPostOutTypeRef },
	put: null,
	delete: null,
} as const)