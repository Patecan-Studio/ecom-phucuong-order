import mongoose, { Document, Schema, Types } from 'mongoose';


export class Address {
	_id: Types.ObjectId | null;
	firstName: string | "";
	lastName: string | "";
	phoneNumber: string | "";
	email: string | "";
	country: string | "";
	city: string | "";
	district: string | "";
	ward: string | "";
	address1: string | "";
	zipCode: string | "";
	active: boolean | false;
}
