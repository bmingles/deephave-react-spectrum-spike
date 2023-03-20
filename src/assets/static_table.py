from deephaven import empty_table

static_table = empty_table(10000).update_view(formulas=[
    "DateTime=nanosToTime(nanos(currentTime()) + i * 1000000)",
    "String=new String(`a`+i * 1000)",
    "Int=new Integer(i)",
    "Long=new Long(i)",
    "Double=new Double(i+i/10)",
    "Float=new Float(i+i/10)",
    "Boolean=new Boolean(i%2==0)",
    "Char= new Character((char) ((i%26)+97))",
    "Short=new Short(Integer.toString(i%32767))",
    "Byte= new java.lang.Byte(Integer.toString(i%127))",
    ##
    "String2=new String(`a`+i)",
    "Int2=new Integer(i)",
    "Long2=new Long(i)",
    "Double2=new Double(i+i/10)",
    "Float2=new Float(i+i/10)",
    "Boolean2=new Boolean(i%2==0)",
    "Char2= new Character((char) ((i%26)+97))",
    "Short2=new Short(Integer.toString(i%32767))",
    "Byte2= new java.lang.Byte(Integer.toString(i%127))",
])