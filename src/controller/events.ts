import {FrameControl} from '../zspec/zcl/definition/tstype';
import {Device, Endpoint} from './model';
import {KeyValue} from './tstype';

enum Events {
    message = 'message',
    adapterDisconnected = 'adapterDisconnected',
    deviceJoined = 'deviceJoined',
    deviceInterview = 'deviceInterview',
    deviceAnnounce = 'deviceAnnounce',
    deviceNetworkAddressChanged = 'deviceNetworkAddressChanged',
    deviceLeave = 'deviceLeave',
    permitJoinChanged = 'permitJoinChanged',
    lastSeenChanged = 'lastSeenChanged',
}

interface DeviceJoinedPayload {
    device: Device;
}

interface DeviceInterviewPayload {
    status: 'started' | 'successful' | 'failed';
    device: Device;
}

interface DeviceNetworkAddressChangedPayload {
    device: Device;
}

interface DeviceAnnouncePayload {
    device: Device;
}

interface DeviceLeavePayload {
    ieeeAddr: string;
}

interface PermitJoinChangedPayload {
    permitted: boolean;
    reason: 'timer_expired' | 'manual';
    timeout: number;
}

interface LastSeenChangedPayload {
    device: Device;
    reason: 'deviceAnnounce' | 'networkAddress' | 'deviceJoined' | 'messageEmitted' | 'messageNonEmitted';
}

type MessagePayloadType = 'attributeReport' | 'readResponse' | 'raw' | 'read' | 'write' | `command${string}`;

interface MessagePayload {
    type: MessagePayloadType;
    device: Device;
    endpoint: Endpoint;
    linkquality: number;
    groupID: number;
    cluster: string | number;
    data: KeyValue | Array<string | number>;
    meta: {
        zclTransactionSequenceNumber?: number;
        manufacturerCode?: number;
        frameControl?: FrameControl;
    };
}

export {
    Events,
    MessagePayload,
    MessagePayloadType,
    DeviceInterviewPayload,
    DeviceAnnouncePayload,
    DeviceLeavePayload,
    DeviceJoinedPayload,
    PermitJoinChangedPayload,
    DeviceNetworkAddressChangedPayload,
    LastSeenChangedPayload,
};
