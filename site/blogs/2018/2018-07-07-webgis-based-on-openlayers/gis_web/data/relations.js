var relations_hg = [
{
	"city": "nt", "neighbors": ["sz", "sh"], "rv": [0.262,0.397]
},
{
	"city": "cz", "neighbors": ["wx", "sz"], "rv": [0.347,0.286]
},
{
	"city": "wx", "neighbors": ["cz", "sz"], "rv": [0.15,0.502]
},
{
	"city": "sz", "neighbors": ["wx", "sh"], "rv": [0.242,0.249]
},
{
	"city": "sh", "neighbors": ["sz"], "rv": [0.256]
},
{
	"city": "jx", "neighbors": ["sz", "sh"], "rv": [0.227,0.332]
},
{
	"city": "huz", "neighbors": ["sz", "sh"], "rv": [0.220,0.219]
},
{
	"city": "haz", "neighbors": ["sh", "sx"], "rv": [0.153,0.274]
},
{
	"city": "sx", "neighbors": ["haz", "nb"], "rv": [0.359,0.227]
},
{
	"city": "nb", "neighbors": ["sh", "sx"], "rv": [0.217,0.168]
},
{
	"city": "zs", "neighbors": ["sh", "nb"], "rv": [0.198,0.573]
},
{
	"city": "tz", "neighbors": ["sh", "nb"], "rv": [0.145,0.398]
},
{
	"city": "jh", "neighbors": ["sh", "nb"], "rv": [0.177,0.200]
}
]

var relations_qc = [
{
	"city": "nt", "neighbors": ["sz", "sh"], "rv": [0.308,0.324]
},
{
	"city": "cz", "neighbors": ["wx", "sz"], "rv": [0.474,0.283]
},
{
	"city": "wx", "neighbors": ["cz", "sz"], "rv": [0.21,0.516]
},
{
	"city": "sz", "neighbors": ["wx", "sh"], "rv": [0.397,0.205]
},
{
	"city": "sh", "neighbors": ["sz"], "rv": [0.305]
},
{
	"city": "jx", "neighbors": ["sz", "sh"], "rv": [0.313,0.318]
},
{
	"city": "huz", "neighbors": ["sz", "sh"], "rv": [0.308,0.213]
},
{
	"city": "haz", "neighbors": ["sh", "sx"], "rv": [0.178,0.261]
},
{
	"city": "sx", "neighbors": ["sh", "haz"], "rv": [0.146,0.341]
},
{
	"city": "nb", "neighbors": ["sx", "sh"], "rv": [0.16,0.237]
},
{
	"city": "zs", "neighbors": ["sh", "nb"], "rv": [0.278,0.380]
},
{
	"city": "tz", "neighbors": ["sh", "nb"], "rv": [0.171,0.222]
},
{
	"city": "jh", "neighbors": ["sz", "sh"], "rv": [0.155,0.196]
}
]

var relations_jx = [
{
	"city": "nt", "neighbors": ["sz", "sh"], "rv": [0.344,0.219]
},
{
	"city": "cz", "neighbors": ["wx", "sz"], "rv": [0.457,0.27]
},
{
	"city": "wx", "neighbors": ["cz", "sz"], "rv": [0.196,0.494]
},
{
	"city": "sz", "neighbors": ["wx"], "rv": [0.411]
},
{
	"city": "sh", "neighbors": ["sz"], "rv": [0.323]
},
{
	"city": "jx", "neighbors": ["sz", "sh"], "rv": [0.352,0.217]
},
{
	"city": "huz", "neighbors": ["sz", "haz"], "rv": [0.326,0.188]
},
{
	"city": "haz", "neighbors": ["sz", "sx"], "rv": [0.186,0.212]
},
{
	"city": "sx", "neighbors": ["haz", "nb"], "rv": [0.406,0.138]
},
{
	"city": "nb", "neighbors": ["sz", "sh"], "rv": [0.185,0.166]
},
{
	"city": "zs", "neighbors": ["sh", "nb"], "rv": [0.186,0.439]
},
{
	"city": "tz", "neighbors": ["sz", "nb"], "rv": [0.131,0.254]
},
{
	"city": "jh", "neighbors": ["sz", "haz"], "rv": [0.172,0.176]
}
]


var relations_fz = [
{
	"city": "nt", "neighbors": ["wx", "sz"], "rv": [0.145,0.4]
},
{
	"city": "cz", "neighbors": ["wx", "sz"], "rv": [0.413,0.321]
},
{
	"city": "wx", "neighbors": ["sz"], "rv": [0.536]
},
{
	"city": "sz", "neighbors": ["wx"], "rv": [0.339]
},
{
	"city": "sh", "neighbors": ["sz", "huz"], "rv": [0.296,0.19]
},
{
	"city": "jx", "neighbors": ["sz", "haz"], "rv": [0.303,0.17]
},
{
	"city": "huz", "neighbors": ["sz", "haz"], "rv": [0.239,0.246]
},
{
	"city": "haz", "neighbors": ["huz", "sx"], "rv": [0.136,0.522]
},
{
	"city": "sx", "neighbors": ["huz", "haz"], "rv": [0.111,0.49]
},
{
	"city": "nb", "neighbors": ["haz", "sx"], "rv": [0.141,0.406]
},
{
	"city": "zs", "neighbors": ["sx", "nb"], "rv": [0.205,0.347]
},
{
	"city": "tz", "neighbors": ["sx", "nb"], "rv": [0.306,0.154]
},
{
	"city": "jh", "neighbors": ["haz", "sx"], "rv": [0.217,0.293]
}
]

var relations_yj = [
{
	"city": "nt", "neighbors": ["sz", "sh"], "rv": [0.32,0.217]
},
{
	"city": "cz", "neighbors": ["wx", "sz"], "rv": [0.535,0.224]
},
{
	"city": "wx", "neighbors": ["sz"], "rv": [0.41]
},
{
	"city": "sz", "neighbors": ["wx"], "rv": [0.474]
},
{
	"city": "sh", "neighbors": ["wx", "sz"], "rv": [0.183,0.336]
},
{
	"city": "jx", "neighbors": ["sz", "sh"], "rv": [0.323,0.212]
},
{
	"city": "huz", "neighbors": ["sz", "sh"], "rv": [0.3,0.133]
},
{
	"city": "haz", "neighbors": ["sz", "sx"], "rv": [0.153,0.258]
},
{
	"city": "sx", "neighbors": ["sz", "haz"], "rv": [0.118,0.388]
},
{
	"city": "nb", "neighbors": ["sz", "sh"], "rv": [0.163,0.156]
},
{
	"city": "zs", "neighbors": ["wx", "nb"], "rv": [0.5,0.203]
},
{
	"city": "tz", "neighbors": ["nb", "jh"], "rv": [0.203,0.138]
},
{
	"city": "jh", "neighbors": ["sz", "haz"], "rv": [0.16,0.166]
}
]