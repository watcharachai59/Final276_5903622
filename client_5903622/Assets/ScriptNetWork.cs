using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System;
using SocketIO;


public class ScriptNetWork : MonoBehaviour
{

    static SocketIOComponent socket;
    public Text textin;
    public Text textout;
    public int Num;

    // Start is called before the first frame update
    void Start()
    {
        socket = GetComponent<SocketIOComponent>();
        socket.On("open", OnConnected);
        socket.On("send",gobth);
        socket.On("win",win);
        socket.On("miss",miss);
        socket.On("Over",Over);

    }

    // Update is called once per frame
    void OnConnected(SocketIOEvent e)
    {
        print("HasConnect");
    }
    void gobth(SocketIOEvent e)
    {
        print("Send");
    }
    public void btn()
    {
        Num = int.Parse(textin.text);
        JSONObject jsonObject = new JSONObject(JSONObject.Type.NUMBER);
        jsonObject.AddField("textin", Num);
        socket.Emit("send", jsonObject);
        textin.GetComponent<Text>().text = "";
    }
    void win(SocketIOEvent e)
    {
        textout.text =("You win");
    }
    void Over(SocketIOEvent e)
    {
        textout.text = ("You Lost");
    }
    void miss(SocketIOEvent e)
    {
        textout.text = ("You Miss");
        JSONObject js = e.data;
        print(e.data);
        print(js["textout"]);
        textout.text = js["textout"].ToString();
    }








}
