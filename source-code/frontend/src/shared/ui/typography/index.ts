import s from "./variants.module.scss";

const typographyVariants = {
	headingH1: s.headingH1,
	headingH2: s.headingH2,
	headingH3: s.headingH3,
	headingH4: s.headingH4,
	textLg: s.textLg,
	textMd: s.textMd,
	textAdditional: s.textAdditional,
	textSm: s.textSm,
	textHelper: s.textHelper,
	link1: s.link1,
};

type TypographyVariants = keyof typeof typographyVariants;

const aasaa = "";

export function typography(variant: TypographyVariants) {
	return typographyVariants[variant];
}
