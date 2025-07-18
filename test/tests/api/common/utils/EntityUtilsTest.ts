import o from "@tutao/otest"
import {
	constructMailSetEntryId,
	create,
	deconstructMailSetEntryId,
	GENERATED_MAX_ID,
	GENERATED_MIN_ID,
	generatedIdToTimestamp,
	removeTechnicalFields,
	timestampToGeneratedId,
	timestampToHexGeneratedId,
} from "../../../../../src/common/api/common/utils/EntityUtils.js"
import { MailTypeRef } from "../../../../../src/common/api/entities/tutanota/TypeRefs.js"
import { typeModels } from "../../../../../src/common/api/entities/tutanota/TypeModels.js"

import { ClientModelEncryptedParsedInstance, ClientTypeModel, ElementEntity } from "../../../../../src/common/api/common/EntityTypes.js"
import { assertNotNull, base64ToUint8Array, clone, TypeRef, uint8ArrayToBase64 } from "@tutao/tutanota-utils"
import { hasError } from "../../../../../src/common/api/common/utils/ErrorUtils.js"
import {
	dummyResolver,
	TestAggregate,
	testAggregateModel,
	TestAggregateOnAggregate,
	TestAggregateOnAggregateRef,
	TestAggregateRef,
	TestEntity,
	testTypeModel,
	TestTypeRef,
} from "../../worker/crypto/InstancePipelineTestUtils"
import { ClientTypeReferenceResolver, PatchOperationType, ServerTypeReferenceResolver } from "../../../../../src/common/api/common/EntityFunctions"
import { createTestEntityWithDummyResolver } from "../../../TestUtils"
import { InstancePipeline } from "../../../../../src/common/api/worker/crypto/InstancePipeline"
import { aes256RandomKey } from "@tutao/tutanota-crypto"
import { AttributeModel } from "../../../../../src/common/api/common/AttributeModel.js"
import { createPatch } from "../../../../../src/common/api/entities/sys/TypeRefs"
import { ValueType } from "../../../../../src/common/api/common/EntityConstants.js"
import { areValuesDifferent, computePatches } from "../../../../../src/common/api/common/utils/PatchGenerator"

o.spec("EntityUtils", function () {
	o("TimestampToHexGeneratedId ", function () {
		let timestamp = 1370563200000
		o(timestampToHexGeneratedId(timestamp, 0)).equals("4fc6fbb10000000000")
	})
	o("TimestampToHexGeneratedId server id 1", function () {
		let timestamp = 1370563200000
		o(timestampToHexGeneratedId(timestamp, 1)).equals("4fc6fbb10000000001")
	})
	o("generatedIdToTimestamp ", function () {
		let maxTimestamp = Math.pow(2, 42) - 1
		o(generatedIdToTimestamp(GENERATED_MIN_ID)).equals(0)
		o(generatedIdToTimestamp(timestampToGeneratedId(0))).equals(0)
		o(generatedIdToTimestamp("zzzzzzzzzzzz")).equals(maxTimestamp)
		o(generatedIdToTimestamp("IwQvgF------")).equals(1370563200000)
	})

	o.spec("MailSetEntry id", function () {
		o("constructMailSetEntryId", function () {
			const mailId: Id = "-----------0"

			const expected = "V7ifKQAAAAAAAAAAAQ"
			const receiveDate = new Date("2017-10-03T13:46:13Z")

			const calculatedId = constructMailSetEntryId(receiveDate, mailId)
			o(expected).equals(calculatedId)
		})

		o("deconstructMailSetEntryId", function () {
			const setEntryId = "V7ifKQAAAAAAAAAAAQ"
			const { receiveDate, mailId } = deconstructMailSetEntryId(setEntryId)
			const diff = Math.abs(receiveDate.getTime() - new Date("2017-10-03T13:46:12.864Z").getTime())
			o(diff < 10).equals(true)(`Expected a date near ${new Date("2017-10-03T13:46:12.864Z")}, got: ${receiveDate} with diff ${diff}`)
			o(mailId).equals("-----------0")
		})
	})

	o("create new entity without error object ", function () {
		const mailEntity = create(typeModels[MailTypeRef.typeId], MailTypeRef)
		o(mailEntity._errors).equals(undefined)
		o(hasError(mailEntity)).equals(false)

		o(mailEntity.subject).equals("") // value with default value
		o(mailEntity.attachments).deepEquals([]) // association with Any cardinality
		o(mailEntity.firstRecipient).equals(null) // association with ZeroOrOne cardinality
	})

	o.spec("removeTechnicalFields", function () {
		const typeRef = { app: "sys", typeId: 9999999 } as TypeRef<unknown>

		function makeEntity() {
			return {
				_id: "test",
				// so that we can compare it
				_type: typeRef,
				_ownerGroup: null,
				_ownerEncSessionKey: null,
			}
		}

		o("it doesn't do anything when there's nothing to remove", function () {
			const originalEntity = makeEntity()
			const entityCopy = clone(originalEntity)
			removeTechnicalFields(entityCopy as ElementEntity)
			o(entityCopy as unknown).deepEquals(originalEntity)
		})
	})
})
