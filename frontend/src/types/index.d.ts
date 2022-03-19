type RangeType<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;
