export type List = {
	id: number;
	title: string;
	description: string;
	date: Date;
	favorite: boolean;
    items: ListItem[] | []
};

export type ListItem = {
	id: number;
	title: string;
	description: string;
	date: Date;
	completed: boolean;
};

