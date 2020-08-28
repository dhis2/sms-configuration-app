import { useDataMutation } from '@dhis2/app-runtime'
import {
    ALERT_PARSER,
    EVENT_REGISTRATION_PARSER,
    J2ME_PARSER,
    KEY_VALUE_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    UNREGISTERED_PARSER,
} from '../smsCommandFields'

export const CREATE_SMS_COMMAND_MUTATION = {
    resource: 'smsCommands',
    type: 'create',
    /*
     * @param {Object} args
     * @param {string} args.parserType
     * @param {string} args.name
     * @param {string} args.dataset (id)
     * @param {string} args.userGroup (id)
     * @param {string} args.program (id)
     * @param {string} args.programStage (id)
     * @returns {Object}
     */
    data: ({ parserType, name, dataset, userGroup, program, programStage }) => {
        if (
            parserType === KEY_VALUE_PARSER.value ||
            parserType === J2ME_PARSER.value
        ) {
            return {
                parserType,
                name,
                dataset,
            }
        }

        if (
            parserType === ALERT_PARSER.value ||
            parserType === UNREGISTERED_PARSER.value
        ) {
            return {
                parserType,
                name,
                userGroup: { id: userGroup },
            }
        }

        if (
            parserType === TRACKED_ENTITY_REGISTRATION_PARSER.value ||
            parserType === EVENT_REGISTRATION_PARSER.value
        ) {
            return {
                parserType,
                name,
                program,
            }
        }

        if (parserType === PROGRAM_STAGE_DATAENTRY_PARSER.value) {
            return {
                parserType,
                name,
                program,
                programStage,
            }
        }

        throw new Error(
            `You provided an unrecognized parserType "${parserType}"`
        )
    },
}

export const useCreateSmsCommandMutation = () =>
    useDataMutation(CREATE_SMS_COMMAND_MUTATION)
